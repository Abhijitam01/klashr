var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationAccessControlModule } from "../../modules/authorization/accessControl";
import { AccessControlGuard } from './guards/accessControl.guard';
import { AccessControlService } from './internal/accessControl.service';
import { AccessControlValidator } from './internal/accessControl.validator';
let AccessControlModule = class AccessControlModule {
    static getGuards() {
        return [{ provide: APP_GUARD, useClass: AccessControlGuard }];
    }
};
AccessControlModule = __decorate([
    Global(),
    Module({
        imports: [AuthorizationAccessControlModule],
        providers: [AccessControlService, AccessControlValidator],
        exports: [AccessControlService],
    })
], AccessControlModule);
export { AccessControlModule };
