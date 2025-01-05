var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from "../../../libraries/email/email.module";
import { UserDomainModule } from "../../user/domain";
import { AuthenticationDomainModule } from '../domain';
import { AuthenticationInfrastructureException } from './authentication.infrastructure.exception';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationGuardService } from './guards/authentication.guard.service';
import { AuthenticationCommunicationSubscriber } from './subscribers/authentication.communication.subscriber';
let AuthenticationInfrastructureModule = class AuthenticationInfrastructureModule {
    static getGuards() {
        return [{ provide: APP_GUARD, useClass: AuthenticationGuard }];
    }
};
AuthenticationInfrastructureModule = __decorate([
    Global(),
    Module({
        imports: [UserDomainModule, AuthenticationDomainModule, EmailModule],
        providers: [
            AuthenticationCommunicationSubscriber,
            AuthenticationGuardService,
            AuthenticationInfrastructureException,
        ],
        exports: [AuthenticationGuardService],
    })
], AuthenticationInfrastructureModule);
export { AuthenticationInfrastructureModule };
