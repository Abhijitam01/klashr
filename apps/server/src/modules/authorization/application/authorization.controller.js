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
import { Body, Controller, Param, Post } from '@nestjs/common';
import { Authentication } from "../../../core/authentication";
import { LoggerService } from "../../../libraries/logger";
import { AuthorizationCodeType, AuthorizationDomainFacade, } from "../domain";
import { UserDomainFacade } from "../../user/domain";
import { UserOrchestrator } from "../../user/orchestrators";
import { AuthorizationApplicationException } from './authorization.application.exception';
import { AuthorizationCreateCodeDto, AuthorizationVerifyCodeDto, } from './authorization.dto';
let AuthorizationController = class AuthorizationController {
    userDomainFacade;
    exception;
    loggerService;
    authorizationDomainFacade;
    userAuthorizationOrchestrator;
    logger;
    constructor(userDomainFacade, exception, loggerService, authorizationDomainFacade, userAuthorizationOrchestrator) {
        this.userDomainFacade = userDomainFacade;
        this.exception = exception;
        this.loggerService = loggerService;
        this.authorizationDomainFacade = authorizationDomainFacade;
        this.userAuthorizationOrchestrator = userAuthorizationOrchestrator;
        this.logger = this.loggerService.create({
            name: 'AuthorizationController',
        });
    }
    async createCode(type, body) {
        const user = await this.userDomainFacade.findOneByEmailOrFail(body.email);
        const values = this.getCodeValues(type);
        await this.deprecatePreviousCodes(user, type);
        const code = await this.authorizationDomainFacade.code.createOrFail({ ...values, type }, user);
        return code;
    }
    async verifyCode(body, type) {
        const user = await this.userDomainFacade.findOneByEmailOrFail(body.email);
        const code = await this.authorizationDomainFacade.code
            .findOneActiveOrFail(user, body.keyPrivate, body.keyPublic)
            .catch(error => {
            this.exception.invalidCodeVerification(error);
        });
        if (!code) {
            this.exception.invalidCodeVerification(new Error('Code not found'));
            return;
        }
        await this.authorizationDomainFacade.code.check(code).catch(error => {
            this.exception.expiredCodeVerification(error);
        });
        await this.authorizationDomainFacade.code.setStatusUsed(code);
        await this.onSuccess(type, user);
        return {};
    }
    getCodeValues(type) {
        switch (type) {
            case AuthorizationCodeType.USER_VERIFICATION:
                return this.userAuthorizationOrchestrator.getCodeValues();
            default:
                this.exception.typeNotFound(type);
        }
    }
    async onSuccess(type, user) {
        switch (type) {
            case AuthorizationCodeType.USER_VERIFICATION:
                await this.userAuthorizationOrchestrator.onSuccess(user);
                break;
            default:
                this.exception.typeNotFound(type);
        }
    }
    async deprecatePreviousCodes(user, type) {
        const codes = await this.authorizationDomainFacade.code.findManyByUserAndType(user, type);
        for (const code of codes) {
            await this.authorizationDomainFacade.code.setStatusExpired(code);
        }
    }
};
__decorate([
    Post('/:type/code'),
    Authentication.Public(),
    __param(0, Param('type')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AuthorizationCreateCodeDto]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "createCode", null);
__decorate([
    Post('/:type/code-verification'),
    Authentication.Public(),
    __param(0, Body()),
    __param(1, Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthorizationVerifyCodeDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "verifyCode", null);
AuthorizationController = __decorate([
    Controller('v1/authorization'),
    __metadata("design:paramtypes", [UserDomainFacade,
        AuthorizationApplicationException,
        LoggerService,
        AuthorizationDomainFacade,
        UserOrchestrator])
], AuthorizationController);
export { AuthorizationController };
