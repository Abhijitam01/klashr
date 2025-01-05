var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionService } from "../../exception";
import { Utility } from "../../../helpers/utility";
let DatabaseHelper = class DatabaseHelper {
    exception;
    constructor(exception) {
        this.exception = exception;
    }
    applyQueryOptions(repository, queryOptions = {}) {
        const query = repository.createQueryBuilder('entity');
        this.applyIncludes(query, queryOptions);
        this.applyFilters(query, queryOptions);
        this.applyOrders(query, queryOptions);
        this.applyPagination(query, queryOptions);
        return query;
    }
    notFoundByQuery(where) {
        const keyValues = Object.entries(where)
            .map(([key, value]) => `"${key}"="${value}"`)
            .join(', ');
        return this.exception.throw({
            status: HttpStatus.NOT_FOUND,
            code: 101,
            publicMessage: 'Resource was not found',
            privateMessage: `Resource with ${keyValues} was not found.`,
        });
    }
    invalidQueryWhere(...keys) {
        const keysString = keys.map(key => `"${key}"`).join(', ');
        return this.exception.throw({
            status: HttpStatus.BAD_REQUEST,
            code: 100,
            publicMessage: 'Resource was not found',
            privateMessage: `Resource where conditions for keys ${keysString} are invalid.`,
        });
    }
    /* --------------------------------- PRIVATE -------------------------------- */
    applyPagination(query, queryOptions) {
        if (!Utility.isDefined(queryOptions.pagination)) {
            return;
        }
        const countItems = queryOptions.pagination.countItems ?? 50;
        const page = queryOptions.pagination.page ?? 1;
        query.take(countItems);
        query.skip((page - 1) * countItems);
    }
    applyIncludes(query, queryOptions) {
        const includes = (queryOptions.includes ?? []);
        const store = {};
        includes.forEach((relation, relationIndex) => {
            const keys = relation.split('.');
            const keysParent = [];
            keys.forEach((key, keyIndex) => {
                const keyUnique = `${key}_${relationIndex}_${keyIndex}`;
                const isRoot = keyIndex === 0;
                if (isRoot) {
                    const canJoin = Utility.isNull(store[key]);
                    if (canJoin) {
                        query.leftJoinAndSelect(`entity.${key}`, `${keyUnique}`);
                        store[key] = keyUnique;
                    }
                }
                else {
                    const keyParent = keysParent.join('.');
                    const keyParentUnique = store[keyParent];
                    query.leftJoinAndSelect(`${keyParentUnique}.${key}`, `${keyUnique}`);
                    store[`${keyParent}.${key}`] = keyUnique;
                }
                keysParent.push(key);
            });
        });
    }
    applyFilters(query, queryOptions) {
        const filters = queryOptions.filters ?? {};
        const conditions = [];
        const values = {};
        for (const [key, value] of Object.entries(filters)) {
            const isArray = Array.isArray(value);
            if (isArray) {
                conditions.push(`entity.${key} IN (:...${key})`);
                values[key] = value;
            }
            else if (typeof value === 'object') {
                const filters = this.buildQueryOptionsFilters(key, value);
                for (const filter of filters) {
                    conditions.push(filter.condition);
                    values[filter.key] = filter.value;
                }
            }
            else {
                conditions.push(`entity.${key} = :${key}`);
                values[key] = value;
            }
        }
        query.where(conditions.join(' AND '), values);
    }
    applyOrders(query, queryOptions) {
        const orders = queryOptions.orders ?? {};
        let isFirst = true;
        for (const [key, value] of Object.entries(orders)) {
            if (!isFirst) {
                query.orderBy(`entity.${key}`, value);
                isFirst = false;
            }
            query.addOrderBy(`entity.${key}`, value);
        }
    }
    buildQueryOptionsFilters(key, filter) {
        const conditions = [];
        if (filter === null) {
            conditions.push({
                condition: `entity.${key} IS NULL`,
                key: `${key}EQ`,
                value: null,
            });
            return conditions;
        }
        if (Utility.isDefined(filter.eq)) {
            conditions.push({
                condition: `entity.${key} = :${key}EQ`,
                key: `${key}EQ`,
                value: filter.eq,
            });
        }
        if (Utility.isDefined(filter.neq)) {
            conditions.push({
                condition: `entity.${key} != :${key}NEQ`,
                key: `${key}NEQ`,
                value: filter.neq,
            });
        }
        if (Utility.isDefined(filter.gt)) {
            conditions.push({
                condition: `entity.${key} > :${key}GT`,
                key: `${key}GT`,
                value: filter.gt,
            });
        }
        if (Utility.isDefined(filter.gte)) {
            conditions.push({
                condition: `entity.${key} >= :${key}GTE`,
                key: `${key}GTE`,
                value: filter.gte,
            });
        }
        if (Utility.isDefined(filter.lt)) {
            conditions.push({
                condition: `entity.${key} < :${key}LT`,
                key: `${key}LT`,
                value: filter.lt,
            });
        }
        if (Utility.isDefined(filter.lte)) {
            conditions.push({
                condition: `entity.${key} <= :${key}LTE`,
                key: `${key}LTE`,
                value: filter.lte,
            });
        }
        if (Utility.isDefined(filter.in)) {
            conditions.push({
                condition: `entity.${key} IN (:...${key}IN)`,
                key: `${key}IN`,
                value: filter.in,
            });
        }
        if (Utility.isDefined(filter.nin)) {
            conditions.push({
                condition: `entity.${key} NOT IN (:...${key}NIN)`,
                key: `${key}NIN`,
                value: filter.nin,
            });
        }
        if (Utility.isDefined(filter.like)) {
            conditions.push({
                condition: `entity.${key} LIKE :${key}LIKE`,
                key: `${key}LIKE`,
                value: filter.like,
            });
        }
        if (Utility.isDefined(filter.ilike)) {
            conditions.push({
                condition: `entity.${key} ILIKE :${key}ILIKE`,
                key: `${key}ILIKE`,
                value: filter.ilike,
            });
        }
        return conditions;
    }
};
DatabaseHelper = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], DatabaseHelper);
export { DatabaseHelper };
