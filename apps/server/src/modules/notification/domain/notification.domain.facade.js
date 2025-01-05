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
import { Notification } from './notification.model';
let NotificationDomainFacade = class NotificationDomainFacade {
    repository;
    databaseHelper;
    constructor(repository, databaseHelper) {
        this.repository = repository;
        this.databaseHelper = databaseHelper;
    }
    async create(values) {
        return this.repository.save(values);
    }
    async update(notification, values) {
        const itemUpdated = { ...notification, ...values };
        return this.repository.save(itemUpdated);
    }
    async delete(notification) {
        await this.repository.softDelete(notification.id);
    }
    async deleteMany(notifications) {
        const isEmpty = notifications.length === 0;
        if (isEmpty) {
            return;
        }
        const ids = notifications.map(notification => notification.id);
        await this.repository.softDelete(ids);
    }
    async findManyByUser(user, queryOptions = {}) {
        if (!user) {
            this.databaseHelper.invalidQueryWhere('user');
        }
        const queryOptionsEnsured = {
            includes: queryOptions.includes,
            orders: queryOptions.orders,
            filters: {
                ...queryOptions.filters,
                userId: user.id,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptionsEnsured);
        return query.getMany();
    }
    async findOneByIdAndUserOrFail(notificationId, user) {
        if (!user) {
            this.databaseHelper.invalidQueryWhere('user');
        }
        const queryOptions = {
            filters: {
                userId: user.id,
                id: notificationId,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptions);
        const notification = await query.getOne();
        if (!notification) {
            this.databaseHelper.notFoundByQuery(queryOptions.filters);
        }
        return notification;
    }
};
NotificationDomainFacade = __decorate([
    Injectable(),
    __param(0, InjectRepository(Notification)),
    __metadata("design:paramtypes", [Repository,
        DatabaseHelper])
], NotificationDomainFacade);
export { NotificationDomainFacade };
