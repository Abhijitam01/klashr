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
let AuthorizationApplicationException = class AuthorizationApplicationException {
    service;
    constructor(service) {
        this.service = service;
    }
    typeNotFound(type) {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 0,
            publicMessage: 'Authorization type was not found',
            privateMessage: `Authorization type "${type}" is not handled`,
        });
    }
    invalidCodeVerification(error) {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 1,
            publicMessage: 'Code is incorrect',
            cause: error,
        });
    }
    expiredCodeVerification(error) {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 2,
            publicMessage: 'Code is expired',
            cause: error,
        });
    }
};
AuthorizationApplicationException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AuthorizationApplicationException);
export { AuthorizationApplicationException };
