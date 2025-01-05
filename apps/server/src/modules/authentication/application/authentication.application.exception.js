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
let AuthenticationApplicationException = class AuthenticationApplicationException {
    service;
    constructor(service) {
        this.service = service;
    }
    invalidAccessToken() {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 1,
            publicMessage: 'Access token is invalid',
        });
    }
    userEmailNotFound(email) {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 2,
            publicMessage: 'Incorrect email or password',
            privateMessage: `User with email "${email}" was not found`,
        });
    }
    userPasswordNotFound(email) {
        return this.service.throw({
            status: HttpStatus.UNAUTHORIZED,
            code: 2,
            publicMessage: 'Incorrect email or password',
            privateMessage: `Password does not match user with email "${email}"`,
        });
    }
    userEmailNotAvailable(email) {
        return this.service.throw({
            status: HttpStatus.CONFLICT,
            code: 3,
            publicMessage: 'Email is not available',
            privateMessage: `User can not register with email "${email}" as it is already taken.`,
        });
    }
    invalidResetPasswordToken() {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 4,
            publicMessage: 'Reset password token is invalid',
        });
    }
    invalidGoogleToken(error) {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 1,
            publicMessage: 'Access token is invalid',
            cause: error,
        });
    }
};
AuthenticationApplicationException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AuthenticationApplicationException);
export { AuthenticationApplicationException };
