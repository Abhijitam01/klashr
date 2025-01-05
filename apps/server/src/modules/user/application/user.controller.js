var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, } from '@nestjs/common';
import { Authentication } from "../../../core/authentication";
import { RequestHelper } from "../../../helpers/request";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { UserDomainFacade } from "../domain";
import { CookieService } from '../../../core/cookie';
import { UserCreateDto, UserUpdateDto } from './user.dto';
let UserController = class UserController {
    cookieSevice;
    userDomainFacade;
    authenticationDomainFacade;
    constructor(cookieSevice, userDomainFacade, authenticationDomainFacade) {
        this.cookieSevice = cookieSevice;
        this.userDomainFacade = userDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const users = await this.userDomainFacade.findMany(queryOptions);
        return users;
    }
    async me(request) {
        const token = this.authenticationDomainFacade.getAccessToken(request);
        const { userId } = this.authenticationDomainFacade.verifyTokenOrFail(token);
        const user = await this.userDomainFacade.findOneByIdOrFail(userId);
        return user;
    }
    async create(body) {
        const userCreated = await this.userDomainFacade.create(body);
        return userCreated;
    }
    async findOne(userId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const user = await this.userDomainFacade.findOneByIdOrFail(userId, queryOptions);
        return user;
    }
    async update(userId, body) {
        const user = await this.userDomainFacade.findOneByIdOrFail(userId);
        const userUpdated = await this.userDomainFacade.update(user, body);
        return userUpdated;
    }
    async delete(userId) {
        const user = await this.userDomainFacade.findOneByIdOrFail(userId);
        await this.userDomainFacade.delete(user);
        return user;
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMany", null);
__decorate([
    Get('/me'),
    Authentication.AllowUserNotVerified(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "me", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserCreateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    Get('/:userId'),
    __param(0, Param('userId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    Patch('/:userId'),
    __param(0, Param('userId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    Delete('/:userId'),
    __param(0, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    Controller('v1/users'),
    __metadata("design:paramtypes", [CookieService,
        UserDomainFacade,
        AuthenticationDomainFacade])
], UserController);
export { UserController };
