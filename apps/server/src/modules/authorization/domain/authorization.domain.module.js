var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseHelperModule } from "../../../core/database";
import { AuthorizationDomainException } from './authorization.domain.exception';
import { AuthorizationDomainFacade } from './authorization.domain.facade';
import { AuthorizationCodeFacade } from './code/authorization.code.facade';
import { AuthorizationCode } from './code/authorization.code.model';
import { AuthorizationRoleFacade } from './role/authorization.role.facade';
import { AuthorizationRole } from './role/authorization.role.model';
import { AuthorizationRoleUserFacade } from './role/authorization.roleUser.facade';
import { AuthorizationRoleUser } from './role/authorization.roleUser.model';
let AuthorizationDomainModule = class AuthorizationDomainModule {
};
AuthorizationDomainModule = __decorate([
    Module({
        imports: [
            DatabaseHelperModule,
            TypeOrmModule.forFeature([
                AuthorizationCode,
                AuthorizationRole,
                AuthorizationRoleUser,
            ]),
        ],
        providers: [
            AuthorizationDomainFacade,
            AuthorizationCodeFacade,
            AuthorizationDomainException,
            AuthorizationRoleFacade,
            AuthorizationRoleUserFacade,
        ],
        exports: [AuthorizationDomainFacade],
    })
], AuthorizationDomainModule);
export { AuthorizationDomainModule };
