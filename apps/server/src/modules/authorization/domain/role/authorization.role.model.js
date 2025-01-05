var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorizationRoleUser } from './authorization.roleUser.model';
let AuthorizationRole = class AuthorizationRole {
    id;
    name;
    roleUsers;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AuthorizationRole.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AuthorizationRole.prototype, "name", void 0);
__decorate([
    OneToMany(() => AuthorizationRoleUser, roleUser => roleUser.role),
    __metadata("design:type", Array)
], AuthorizationRole.prototype, "roleUsers", void 0);
AuthorizationRole = __decorate([
    Entity()
], AuthorizationRole);
export { AuthorizationRole };
