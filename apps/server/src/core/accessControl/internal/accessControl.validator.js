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
let AccessControlValidator = class AccessControlValidator {
    constructor() { }
    async check({ userData, constraints }) {
        const { roles } = constraints;
        for (const role of roles) {
            this.checkRole(userData, role);
        }
    }
    checkRole(userData, role) {
        const isFound = userData.roles.includes(role);
        if (!isFound) {
            const { user, roles } = userData;
            throw new Error(`User ${user.email} (${user.id}) has role(s) "${roles.join('", "')}" but is missing "${role}"`);
        }
    }
};
AccessControlValidator = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AccessControlValidator);
export { AccessControlValidator };
