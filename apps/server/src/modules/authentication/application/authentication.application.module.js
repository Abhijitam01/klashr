var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { GoogleModule } from '../../../libraries/google';
import { UserDomainModule } from '../../../modules/user/domain';
import { AuthenticationDomainModule } from '../domain';
import { AuthenticationApplicationException } from './authentication.application.exception';
import { AuthenticationController } from './authentication.controller';
import { GoogleByAuthenticationController } from './authentication.google.controller';
let AuthenticationApplicationModule = class AuthenticationApplicationModule {
};
AuthenticationApplicationModule = __decorate([
    Module({
        imports: [AuthenticationDomainModule, UserDomainModule, GoogleModule],
        controllers: [AuthenticationController, GoogleByAuthenticationController],
        providers: [AuthenticationApplicationException],
        exports: [],
    })
], AuthenticationApplicationModule);
export { AuthenticationApplicationModule };
