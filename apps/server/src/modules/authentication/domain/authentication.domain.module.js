var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieModule } from "../../../core/cookie";
import { DatabaseHelperModule } from "../../../core/database";
import { AuthorizationCode } from '../../authorization/domain/code/authorization.code.model';
import { AuthenticationDomainFacade } from './authentication.domain.facade';
let AuthenticationDomainModule = class AuthenticationDomainModule {
};
AuthenticationDomainModule = __decorate([
    Module({
        imports: [
            DatabaseHelperModule,
            TypeOrmModule.forFeature([AuthorizationCode]),
            CookieModule,
        ],
        providers: [AuthenticationDomainFacade],
        exports: [AuthenticationDomainFacade],
    })
], AuthenticationDomainModule);
export { AuthenticationDomainModule };
