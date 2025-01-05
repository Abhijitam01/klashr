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
let AuthorizationAccessControlException = class AuthorizationAccessControlException {
    service;
    constructor(service) {
        this.service = service;
    }
    invalidPermission(error) {
        return this.service.throw({
            status: HttpStatus.FORBIDDEN,
            code: 1,
            publicMessage: 'User is not allowed',
            privateMessage: `User does not have access to this resource: ${error.message}`,
        });
    }
};
AuthorizationAccessControlException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AuthorizationAccessControlException);
export { AuthorizationAccessControlException };
