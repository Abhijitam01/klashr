var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionService } from "../../../core/exception";
let AuthenticationInfrastructureException = class AuthenticationInfrastructureException {
    service;
    constructor(service) {
        this.service = service;
    }
    invalidAccessToken() {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 0,
            publicMessage: 'Access token is invalid',
        });
    }
    userNotVerifiedUnauthorized(user) {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 1,
            publicMessage: 'You must verify your account',
            privateMessage: `User ${user.email} is not verified (${user.status})`,
        });
    }
    userVisitorUnauthorized(user) {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 2,
            publicMessage: 'You must create an account',
            privateMessage: `User visitor "${user.id}" is not authorized`,
        });
    }
};
AuthenticationInfrastructureException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AuthenticationInfrastructureException);
export { AuthenticationInfrastructureException };
