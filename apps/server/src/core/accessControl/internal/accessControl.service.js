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
import { ContextHelper } from "../../../helpers/context";
import { Utility } from "../../../helpers/utility";
import { AuthorizationAccessControlService } from "../../../modules/authorization/accessControl";
import { AccessControlRoleDecorator } from '../decorators/accessControl.role.decorator';
import { AccessControlValidator } from './accessControl.validator';
let AccessControlService = class AccessControlService {
    authorizationAccessControlService;
    validator;
    constructor(authorizationAccessControlService, validator) {
        this.authorizationAccessControlService = authorizationAccessControlService;
        this.validator = validator;
    }
    async run(reflector, context) {
        const request = ContextHelper.toRequest(context);
        const constraints = this.getConstraints(reflector, context);
        const canSkip = Utility.isEmpty(constraints.roles);
        if (canSkip) {
            return true;
        }
        let userData = await this.authorizationAccessControlService.findUserData(request);
        await this.validator
            .check({
            userData,
            constraints,
        })
            .catch(error => {
            this.authorizationAccessControlService.onError(error);
        });
        return true;
    }
    getConstraints(reflector, context) {
        const roles = AccessControlRoleDecorator.get(context, reflector);
        return {
            roles,
        };
    }
};
AccessControlService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthorizationAccessControlService,
        AccessControlValidator])
], AccessControlService);
export { AccessControlService };
