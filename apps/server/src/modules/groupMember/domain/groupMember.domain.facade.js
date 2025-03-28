var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseHelper } from '../../../core/database';
import { GroupMember } from './groupMember.model';
let GroupMemberDomainFacade = class GroupMemberDomainFacade {
    repository;
    databaseHelper;
    constructor(repository, databaseHelper) {
        this.repository = repository;
        this.databaseHelper = databaseHelper;
    }
    async create(values) {
        return this.repository.save(values);
    }
    async update(item, values) {
        const itemUpdated = { ...item, ...values };
        return this.repository.save(itemUpdated);
    }
    async delete(item) {
        await this.repository.softDelete(item.id);
    }
    async findMany(queryOptions = {}) {
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptions);
        return query.getMany();
    }
    async findOneByIdOrFail(id, queryOptions = {}) {
        if (!id) {
            this.databaseHelper.invalidQueryWhere('id');
        }
        const queryOptionsEnsured = {
            includes: queryOptions?.includes,
            filters: {
                id: id,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptionsEnsured);
        const item = await query.getOne();
        if (!item) {
            this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters);
        }
        return item;
    }
    async findManyByGroup(item, queryOptions = {}) {
        if (!item) {
            this.databaseHelper.invalidQueryWhere('group');
        }
        const queryOptionsEnsured = {
            includes: queryOptions.includes,
            orders: queryOptions.orders,
            filters: {
                ...queryOptions.filters,
                groupId: item.id,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptionsEnsured);
        return query.getMany();
    }
    async findManyByUser(item, queryOptions = {}) {
        if (!item) {
            this.databaseHelper.invalidQueryWhere('user');
        }
        const queryOptionsEnsured = {
            includes: queryOptions.includes,
            orders: queryOptions.orders,
            filters: {
                ...queryOptions.filters,
                userId: item.id,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptionsEnsured);
        return query.getMany();
    }
};
GroupMemberDomainFacade = __decorate([
    Injectable(),
    __param(0, InjectRepository(GroupMember)),
    __metadata("design:paramtypes", [Repository,
        DatabaseHelper])
], GroupMemberDomainFacade);
export { GroupMemberDomainFacade };
