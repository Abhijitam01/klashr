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
import { AuthorizationDomainEvent } from "../../domain/authorization.domain.event";
import { EmailService } from '../../../../libraries/email';
import { UserDomainFacade } from '../../../user/domain';
import { AuthorizationDomainFacade } from '../../domain';
let AuthorizationCommunicationSubscriber = class AuthorizationCommunicationSubscriber {
    userDomainFacade;
    authorizationDomainFacade;
    emailService;
    constructor(userDomainFacade, authorizationDomainFacade, emailService) {
        this.userDomainFacade = userDomainFacade;
        this.authorizationDomainFacade = authorizationDomainFacade;
        this.emailService = emailService;
    }
    async handleCodeCreated(data) {
        const code = await this.authorizationDomainFacade.code.findOneByIdOrFail(data.authorizationCodeId);
        const user = await this.userDomainFacade.findOneByAuthorizationCodeOrFail(code);
        const keyPrivate = this.authorizationDomainFacade.code.getKeyPrivate(code);
        const type = this.emailService.Type.AUTHORIZATION_VERIFICATION_CODE;
        await this.emailService.send({
            type,
            email: user.email,
            name: user.name ?? user.email,
            subject: `Single-use verification code`,
            variables: {
                code: keyPrivate,
                expiration: this.getExpiration(code),
            },
        });
    }
    getExpiration(code) {
        const durationMinutes = code.durationMinutes;
        const minutes = durationMinutes % 60;
        const hours = (durationMinutes - minutes) / 60;
        if (minutes > 0 && hours > 0) {
            return `${hours} hours and ${minutes} minutes`;
        }
        if (minutes > 0) {
            return `${minutes} minutes`;
        }
        if (hours > 1) {
            return `${hours} hours`;
        }
        return `${hours} hour`;
    }
};
__decorate([
    OnEvent(AuthorizationDomainEvent.CodeCreated.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizationCommunicationSubscriber.prototype, "handleCodeCreated", null);
AuthorizationCommunicationSubscriber = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserDomainFacade,
        AuthorizationDomainFacade,
        EmailService])
], AuthorizationCommunicationSubscriber);
export { AuthorizationCommunicationSubscriber };
