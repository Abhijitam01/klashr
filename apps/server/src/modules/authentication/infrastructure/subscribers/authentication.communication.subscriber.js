var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserOrchestratorEvent } from "../../../user/orchestrators/user.orchestrator.event";
import { ConfigurationService } from '../../../../core/configuration';
import { EmailService } from '../../../../libraries/email';
import { UserDomainFacade } from '../../../user/domain';
import { AuthenticationApplicationEvent } from '../../application';
import { AuthenticationDomainFacade } from '../../domain';
let AuthenticationCommunicationSubscriber = class AuthenticationCommunicationSubscriber {
    configurationService;
    userDomainFacade;
    authenticationDomainFacade;
    emailService;
    constructor(configurationService, userDomainFacade, authenticationDomainFacade, emailService) {
        this.configurationService = configurationService;
        this.userDomainFacade = userDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.emailService = emailService;
    }
    async handleUserRegistered(data) {
        const user = await this.userDomainFacade.findOneByIdOrFail(data.userId);
        const type = this.emailService.Type.AUTHENTICATION_WELCOME;
        await this.emailService.send({
            type,
            email: user.email,
            name: user.name ?? user.email,
            subject: `Welcome`,
            variables: {},
        });
    }
    async handleResetPassword(data) {
        const user = await this.userDomainFacade.findOneByIdOrFail(data.userId);
        const token = this.authenticationDomainFacade.buildTokenResetPassword(user);
        const url = this.configurationService.getClientBaseUrl();
        const urlResetPassword = `${url}/reset-password/${token}`;
        const type = this.emailService.Type.AUTHENTICATION_FORGOT_PASSWORD;
        await this.emailService.send({
            type,
            email: user.email,
            name: user.name ?? user.email,
            subject: `Reset your password`,
            variables: {
                url_password_reset: urlResetPassword,
            },
        });
    }
};
__decorate([
    OnEvent(UserOrchestratorEvent.Verified.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationCommunicationSubscriber.prototype, "handleUserRegistered", null);
__decorate([
    OnEvent(AuthenticationApplicationEvent.UserPasswordResetRequested.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationCommunicationSubscriber.prototype, "handleResetPassword", null);
AuthenticationCommunicationSubscriber = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService,
        UserDomainFacade,
        AuthenticationDomainFacade,
        EmailService])
], AuthenticationCommunicationSubscriber);
export { AuthenticationCommunicationSubscriber };
