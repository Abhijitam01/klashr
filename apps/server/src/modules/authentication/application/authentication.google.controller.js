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
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Authentication } from "../../../core/authentication";
import { EventService } from "../../../libraries/event";
import { GoogleService } from "../../../libraries/google";
import { LoggerService } from "../../../libraries/logger";
import { UserDomainFacade } from "../../user/domain";
import { CookieService } from '../../../core/cookie';
import { AuthenticationDomainFacade } from '../domain';
import { AuthenticationApplicationEvent } from './authentication.application.event';
import { AuthenticationApplicationException } from './authentication.application.exception';
import { GoogleByAuthenticationCallbackDto } from './authentication.dto';
let GoogleByAuthenticationController = class GoogleByAuthenticationController {
    authenticationDomainFacade;
    userDomainFacade;
    googleService;
    loggerService;
    eventService;
    exception;
    cookieService;
    logger;
    constructor(authenticationDomainFacade, userDomainFacade, googleService, loggerService, eventService, exception, cookieService) {
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.userDomainFacade = userDomainFacade;
        this.googleService = googleService;
        this.loggerService = loggerService;
        this.eventService = eventService;
        this.exception = exception;
        this.cookieService = cookieService;
        this.logger = this.loggerService.create({
            name: 'GoogleByAuthenticationController',
        });
    }
    async callback(body, response) {
        const { name, email } = await this.googleService
            .verifyToken(body.token)
            .catch(error => this.exception.invalidGoogleToken(error));
        let token;
        try {
            const user = await this.userDomainFacade.findOneByEmailOrFail(email);
            token = this.authenticationDomainFacade.buildToken(user.id);
        }
        catch (error) {
            const registerData = await this.register(email, name);
            token = registerData.token;
        }
        const data = this.authenticationDomainFacade.setAccessToken(response, token);
        return data;
    }
    async register(email, name) {
        await this.userDomainFacade.create({
            email,
            name,
        });
        const user = await this.userDomainFacade.findOneByEmailOrFail(email);
        await this.userDomainFacade.setVerified(user);
        const token = this.authenticationDomainFacade.buildToken(user.id);
        await this.eventService.emit(AuthenticationApplicationEvent.UserRegistered.key, { userId: user.id });
        this.logger.log(`User ${email} registered with google`);
        return { token };
    }
};
__decorate([
    Post('/callback'),
    Authentication.Public(),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GoogleByAuthenticationCallbackDto, Object]),
    __metadata("design:returntype", Promise)
], GoogleByAuthenticationController.prototype, "callback", null);
GoogleByAuthenticationController = __decorate([
    Controller('/v1/authentication/google'),
    __metadata("design:paramtypes", [AuthenticationDomainFacade,
        UserDomainFacade,
        GoogleService,
        LoggerService,
        EventService,
        AuthenticationApplicationException,
        CookieService])
], GoogleByAuthenticationController);
export { GoogleByAuthenticationController };
