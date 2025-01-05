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
let AuthorizationDomainException = class AuthorizationDomainException {
    service;
    constructor(service) {
        this.service = service;
    }
    codeNotFoundById(id) {
        return this.service.throw({
            status: HttpStatus.NOT_FOUND,
            code: 1,
            publicMessage: 'Authorization code was not found',
            privateMessage: `Authorization code id "${id}" was not found.`,
        });
    }
    codeNotFoundByKeys(user, keyPrivate, keyPublic) {
        return this.service.throw({
            status: HttpStatus.NOT_FOUND,
            code: 1,
            publicMessage: 'Authorization code was not found',
            privateMessage: `Authorization code with private key "${keyPrivate}" and public key "${keyPublic}" was not found for user "${user.id}".`,
        });
    }
};
AuthorizationDomainException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AuthorizationDomainException);
export { AuthorizationDomainException };
