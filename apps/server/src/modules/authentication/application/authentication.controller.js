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
import { Body, Controller, Patch, Post, Req, Res } from '@nestjs/common';
import { Authentication } from "../../../core/authentication";
import { EventService } from "../../../libraries/event";
import { LoggerService } from "../../../libraries/logger";
import { UserDomainFacade } from "../../user/domain";
import { CookieService } from '../../../core/cookie';
import { AuthenticationDomainFacade } from '../domain';
import { AuthenticationApplicationEvent } from './authentication.application.event';
import { AuthenticationApplicationException } from './authentication.application.exception';
import { AuthenticationLoginDto, AuthenticationRegisterDto, AuthenticationResetPasswordDto, AuthenticationSendEmailResetPasswordDto, } from './authentication.dto';
let AuthenticationController = class AuthenticationController {
    authenticationDomainFacade;
    exception;
    userDomainFacade;
    loggerService;
    event;
    cookieService;
    logger;
    constructor(authenticationDomainFacade, exception, userDomainFacade, loggerService, event, cookieService) {
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.exception = exception;
        this.userDomainFacade = userDomainFacade;
        this.loggerService = loggerService;
        this.event = event;
        this.cookieService = cookieService;
        this.logger = this.loggerService.create({
            name: 'AuthenticationController',
        });
    }
    async login(body, response) {
        const { email, password } = body;
        const user = await this.userDomainFacade
            .findOneByEmailWithPassword(email)
            .catch(() => this.exception.userEmailNotFound(email));
        await this.userDomainFacade
            .verifyPassword(user, password)
            .catch(() => this.exception.userPasswordNotFound(email));
        const token = this.authenticationDomainFacade.buildToken(user.id);
        const data = this.authenticationDomainFacade.setAccessToken(response, token);
        return data;
    }
    async register(request, body, response) {
        const { email, password } = body;
        const userExisting = await this.userDomainFacade
            .findOneByEmailOrFail(email)
            .catch(() => { });
        if (userExisting) {
            this.exception.userEmailNotAvailable(email);
        }
        const passwordHashed = await this.userDomainFacade.hashPassword(password);
        let user;
        try {
            const token = this.authenticationDomainFacade.getAccessToken(request);
            const payload = this.authenticationDomainFacade.verifyTokenOrFail(token);
            const candidate = await this.userDomainFacade.findOneByIdOrFail(payload.userId);
            if (this.userDomainFacade.isVisitor(candidate)) {
                user = candidate;
            }
        }
        catch {
            // ignore
        }
        if (user) {
            user = await this.userDomainFacade.update(user, {
                ...body,
                password: passwordHashed,
            });
        }
        else {
            user = await this.userDomainFacade.create({
                ...body,
                password: passwordHashed,
            });
        }
        const token = this.authenticationDomainFacade.buildToken(user.id);
        await this.event.emit(AuthenticationApplicationEvent.UserRegistered.key, { userId: user.id });
        const data = this.authenticationDomainFacade.setAccessToken(response, token);
        return data;
    }
    async refresh(request, response) {
        const token = this.authenticationDomainFacade.getAccessToken(request);
        try {
            let userId;
            try {
                const payload = this.authenticationDomainFacade.verifyTokenOrFail(token);
                userId = payload.userId;
            }
            catch (error) {
                this.exception.invalidAccessToken();
            }
            const user = await this.userDomainFacade.findOneByIdOrFail(userId);
            const tokenRefreshed = this.authenticationDomainFacade.buildToken(user.id);
            const data = this.authenticationDomainFacade.setAccessToken(response, tokenRefreshed);
            return data;
        }
        catch (error) {
            this.cookieService.deleteAccessToken(response);
            throw error;
        }
    }
    async registerVisitor(request, response) {
        let user;
        try {
            const token = this.authenticationDomainFacade.getAccessToken(request);
            const payload = this.authenticationDomainFacade.verifyTokenOrFail(token);
            const userId = payload.userId;
            user = await this.userDomainFacade.findOneByIdOrFail(userId);
        }
        catch {
            user = await this.userDomainFacade.create({});
        }
        const token = this.authenticationDomainFacade.buildToken(user.id);
        const data = this.authenticationDomainFacade.setAccessToken(response, token);
        return data;
    }
    async sendEmailResetPassword(body) {
        const user = await this.userDomainFacade
            .findOneByEmailOrFail(body.email)
            .catch(() => null);
        if (!user) {
            this.logger.log(`${body.email} was not found. Reset password email skipped.`);
            return {};
        }
        await this.event.emit(AuthenticationApplicationEvent.UserPasswordResetRequested.key, { userId: user.id });
        return {};
    }
    async resetPassword(body) {
        const { userId } = await this.authenticationDomainFacade
            .verifyTokenResetPasswordOrFail(body.token)
            .catch(() => this.exception.invalidResetPasswordToken());
        const user = await this.userDomainFacade.findOneByIdOrFail(userId);
        const passwordHashed = await this.userDomainFacade.hashPassword(body.password);
        await this.userDomainFacade.update(user, {
            password: passwordHashed,
        });
        return {};
    }
    async logout(response) {
        try {
            this.cookieService.deleteAccessToken(response);
        }
        catch (error) {
            console.log(error);
        }
        return {};
    }
};
__decorate([
    Post('/login'),
    Authentication.Public(),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticationLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    Post('/register'),
    Authentication.Public(),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AuthenticationRegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    Post('/refresh'),
    Authentication.Public(),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refresh", null);
__decorate([
    Post('/register-visitor'),
    Authentication.Public(),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "registerVisitor", null);
__decorate([
    Post('/reset-password-email'),
    Authentication.Public(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticationSendEmailResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "sendEmailResetPassword", null);
__decorate([
    Patch('/reset-password'),
    Authentication.Public(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthenticationResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resetPassword", null);
__decorate([
    Post('/logout'),
    Authentication.Public(),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
AuthenticationController = __decorate([
    Controller('/v1/authentication'),
    __metadata("design:paramtypes", [AuthenticationDomainFacade,
        AuthenticationApplicationException,
        UserDomainFacade,
        LoggerService,
        EventService,
        CookieService])
], AuthenticationController);
export { AuthenticationController };
