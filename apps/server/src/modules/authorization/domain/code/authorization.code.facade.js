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
import { DatabaseHelper } from "../../../../core/database";
import { Utility } from "../../../../helpers/utility";
import { EventService } from "../../../../libraries/event";
import { Repository } from 'typeorm';
import { AuthorizationDomainEvent } from '../authorization.domain.event';
import { AuthorizationDomainException } from '../authorization.domain.exception';
import { AuthorizationCode, AuthorizationCodeStatus, } from './authorization.code.model';
let AuthorizationCodeFacade = class AuthorizationCodeFacade {
    repository;
    databaseHelper;
    exception;
    eventService;
    constructor(repository, databaseHelper, exception, eventService) {
        this.repository = repository;
        this.databaseHelper = databaseHelper;
        this.exception = exception;
        this.eventService = eventService;
    }
    async createOrFail(values, user) {
        const keyPublic = await this.buildKey();
        const keyPrivate = await this.buildKey();
        const code = {
            ...values,
            userId: user.id,
            keyPublic,
            keyPrivate,
        };
        const codeCreated = await this.repository.save(code);
        await this.eventService.emit(AuthorizationDomainEvent.CodeCreated.key, { authorizationCodeId: code.id });
        return codeCreated;
    }
    async check(code) {
        const minutes = code.durationMinutes;
        const dateCreated = new Date(code.dateCreated);
        const dateExpiration = new Date(dateCreated.getTime() + minutes * 60000);
        const dateNow = new Date();
        if (dateNow > dateExpiration) {
            throw new Error(`Code is expired (${dateNow.getTime()} > ${dateExpiration.getTime()})`);
        }
    }
    async setStatusExpired(code) {
        return this.update(code, {
            status: AuthorizationCodeStatus.EXPIRED,
        });
    }
    async setStatusUsed(code) {
        return this.update(code, {
            status: AuthorizationCodeStatus.USED,
        });
    }
    async create(code) {
        return this.repository.save(code);
    }
    async update(code, values) {
        const codeUpdated = { ...code, ...values };
        return this.repository.save(codeUpdated);
    }
    async findOneByIdOrFail(codeId) {
        if (!codeId) {
            this.databaseHelper.invalidQueryWhere('codeId');
        }
        const code = await this.repository.findOne({ where: { id: codeId } });
        if (!code) {
            this.exception.codeNotFoundById(codeId);
        }
        return code;
    }
    async findOneActiveOrFail(user, keyPrivate, keyPublic) {
        const code = await this.repository.findOne({
            where: {
                userId: user.id,
                keyPrivate,
                keyPublic,
                status: AuthorizationCodeStatus.ACTIVE,
            },
        });
        if (!code) {
            this.exception.codeNotFoundByKeys(user, keyPrivate, keyPublic);
        }
        return code;
    }
    async findManyByUserAndType(user, type) {
        if (!type) {
            this.databaseHelper.invalidQueryWhere('type');
        }
        const codes = await this.repository.find({
            where: { userId: user.id, type },
        });
        return codes;
    }
    async delete(code) {
        await this.repository.softDelete({ id: code.id });
    }
    getKeyPrivate(authorizationCode) {
        return authorizationCode.keyPrivate;
    }
    async buildKey() {
        return Utility.buildRandomAlphanumericString(8);
    }
};
AuthorizationCodeFacade = __decorate([
    Injectable(),
    __param(0, InjectRepository(AuthorizationCode)),
    __metadata("design:paramtypes", [Repository,
        DatabaseHelper,
        AuthorizationDomainException,
        EventService])
], AuthorizationCodeFacade);
export { AuthorizationCodeFacade };
