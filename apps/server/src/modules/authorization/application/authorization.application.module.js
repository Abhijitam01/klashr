var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthorizationDomainModule } from "../domain";
import { UserDomainModule } from "../../user/domain";
import { UserOrchestratorModule } from "../../user/orchestrators";
import { AuthenticationDomainModule } from '../../authentication/domain';
import { AuthorizationApplicationException } from './authorization.application.exception';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationByUserController } from './authorizationByMe.controller';
let AuthorizationApplicationModule = class AuthorizationApplicationModule {
};
AuthorizationApplicationModule = __decorate([
    Module({
        imports: [
            UserDomainModule,
            AuthenticationDomainModule,
            AuthorizationDomainModule,
            UserOrchestratorModule,
        ],
        controllers: [AuthorizationController, AuthorizationByUserController],
        providers: [AuthorizationApplicationException],
    })
], AuthorizationApplicationModule);
export { AuthorizationApplicationModule };
