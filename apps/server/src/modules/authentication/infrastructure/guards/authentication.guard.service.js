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
import { Authentication } from "../../../../core/authentication";
import { ContextHelper } from "../../../../helpers/context";
import { UserDomainFacade } from '../../../user/domain';
import { AuthenticationDomainFacade } from '../../domain';
import { AuthenticationInfrastructureException } from '../authentication.infrastructure.exception';
let AuthenticationGuardService = class AuthenticationGuardService {
    authenticationDomainFacade;
    userDomainFacade;
    exception;
    constructor(authenticationDomainFacade, userDomainFacade, exception) {
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.userDomainFacade = userDomainFacade;
        this.exception = exception;
    }
    async validateRequest(reflector, context) {
        const isPublic = Authentication.isPublic(context, reflector);
        if (isPublic) {
            return true;
        }
        const request = ContextHelper.toRequest(context);
        const token = this.authenticationDomainFacade.getAccessToken(request);
        let userId;
        try {
            const payload = this.authenticationDomainFacade.verifyTokenOrFail(token);
            userId = payload.userId;
        }
        catch (error) {
            this.exception.invalidAccessToken();
        }
        const user = await this.userDomainFacade.findOneByIdOrFail(userId);
        await this.checkUserNotVerified(reflector, context, user);
        await this.checkUserVisitor(reflector, context, user);
        this.authenticationDomainFacade.assignRequestPayload(request, { user });
        return true;
    }
    async checkUserNotVerified(reflector, context, user) {
        const isUserNotVerifiedAllowed = Authentication.isUserNotVerifiedAllowed(context, reflector);
        if (isUserNotVerifiedAllowed) {
            return;
        }
        const isVerified = this.userDomainFacade.isVerified(user);
        const isVisitor = this.userDomainFacade.isVisitor(user);
        if (isVerified || isVisitor) {
            return;
        }
        this.exception.userNotVerifiedUnauthorized(user);
    }
    async checkUserVisitor(reflector, context, user) {
        const isUserVisitorAllowed = Authentication.isVisitorAllowed(context, reflector);
        if (isUserVisitorAllowed) {
            return;
        }
        const isVisitor = this.userDomainFacade.isVisitor(user);
        if (isVisitor) {
            this.exception.userVisitorUnauthorized(user);
        }
    }
};
AuthenticationGuardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthenticationDomainFacade,
        UserDomainFacade,
        AuthenticationInfrastructureException])
], AuthenticationGuardService);
export { AuthenticationGuardService };
