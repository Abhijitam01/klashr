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
import { DatabaseHelper } from "../../../core/database";
import { HashHelper } from "../../../helpers/hash/hash.helper";
import { Utility } from "../../../helpers/utility";
import { Repository } from 'typeorm';
import { UserException } from './user.exception';
import { User, UserStatus } from './user.model';
let UserDomainFacade = class UserDomainFacade {
    repository;
    databaseHelper;
    exception;
    constructor(repository, databaseHelper, exception) {
        this.repository = repository;
        this.databaseHelper = databaseHelper;
        this.exception = exception;
    }
    create(values) {
        const user = {
            ...values,
        };
        if (user.email) {
            user.email = user.email.trim().toLowerCase();
        }
        return this.repository.save(user);
    }
    update(user, values) {
        const userUpdated = {
            ...user,
            ...values,
        };
        if (userUpdated.email) {
            userUpdated.email = userUpdated.email.trim().toLowerCase();
        }
        return this.repository.save(userUpdated);
    }
    async findMany(queryOptions = {}) {
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptions);
        return query.getMany();
    }
    async findOneByEmailWithPassword(email) {
        const user = await this.repository.findOne({
            where: { email: email.trim().toLowerCase() },
            select: ['id', 'email', 'password'],
        });
        if (!user) {
            this.exception.notFoundByEmail(email);
        }
        return user;
    }
    async findOneByStripeCustomerIdOrFail(stripeCustomerId) {
        if (!Utility.isDefined(stripeCustomerId)) {
            this.databaseHelper.invalidQueryWhere('stripeCustomerId');
        }
        const user = await this.repository.findOne({
            where: { stripeCustomerId },
        });
        if (!user) {
            this.databaseHelper.notFoundByQuery({ stripeCustomerId });
        }
        return user;
    }
    async findOneByIdWithStripeCustomerIdOrFail(userId) {
        const user = await this.repository.findOne({
            where: { id: userId },
            select: ['id', 'email', 'name', 'stripeCustomerId'],
        });
        if (!user) {
            this.exception.notFoundById(userId);
        }
        return user;
    }
    async findOneByIdOrFail(id, queryOptions = {}) {
        if (!Utility.isDefined(id)) {
            this.databaseHelper.invalidQueryWhere('id');
        }
        const queryOptionsEnsured = {
            includes: queryOptions.includes,
            filters: {
                id: id,
            },
        };
        const query = this.databaseHelper.applyQueryOptions(this.repository, queryOptionsEnsured);
        const user = await query.getOne();
        if (!user) {
            this.exception.notFoundById(id);
        }
        return user;
    }
    async findOneByEmailOrFail(email) {
        if (!Utility.isDefined(email)) {
            this.databaseHelper.invalidQueryWhere('email');
        }
        const user = await this.repository.findOne({
            where: { email: email.trim().toLowerCase() },
        });
        if (!user) {
            this.exception.notFoundByEmail(email);
        }
        return user;
    }
    async findOneByAuthorizationCodeOrFail(authorizationCode) {
        const id = authorizationCode.userId;
        if (!Utility.isDefined(id)) {
            this.databaseHelper.invalidQueryWhere('id');
        }
        const user = await this.repository.findOne({
            where: { id },
        });
        if (!user) {
            this.exception.notFoundById(id);
        }
        return user;
    }
    async delete(user) {
        await this.repository.softDelete(user.id);
    }
    async hashPassword(password) {
        return HashHelper.run(password);
    }
    async verifyPassword(user, password) {
        const isMatch = HashHelper.verify(password, user.password);
        if (isMatch) {
            return;
        }
        else {
            throw new Error(`Password is incorrect.`);
        }
    }
    isVerified(user) {
        return user.status === UserStatus.VERIFIED;
    }
    setVerified(user) {
        return this.update(user, { status: UserStatus.VERIFIED });
    }
    isVisitor(user) {
        return Utility.isNull(user.email);
    }
};
UserDomainFacade = __decorate([
    Injectable(),
    __param(0, InjectRepository(User)),
    __metadata("design:paramtypes", [Repository,
        DatabaseHelper,
        UserException])
], UserDomainFacade);
export { UserDomainFacade };
