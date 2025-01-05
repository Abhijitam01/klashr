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
import { Controller, Get, Req } from '@nestjs/common';
import { LoggerService } from "../../../libraries/logger";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { UserDomainFacade } from "../../user/domain";
import { AuthorizationDomainFacade } from '../domain';
let AuthorizationByUserController = class AuthorizationByUserController {
    userDomainFacade;
    loggerService;
    authorizationDomainFacade;
    authenticationDomainFacade;
    logger;
    constructor(userDomainFacade, loggerService, authorizationDomainFacade, authenticationDomainFacade) {
        this.userDomainFacade = userDomainFacade;
        this.loggerService = loggerService;
        this.authorizationDomainFacade = authorizationDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.logger = this.loggerService.create({
            name: 'AuthorizationByUserController',
        });
    }
    async getPermissions(request) {
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = await this.userDomainFacade.findOneByIdOrFail(payload.user.id);
        const roles = await this.authorizationDomainFacade.role.findManyByUser(user);
        return { roles };
    }
};
__decorate([
    Get('/permissions'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthorizationByUserController.prototype, "getPermissions", null);
AuthorizationByUserController = __decorate([
    Controller('v1/users/me/authorization'),
    __metadata("design:paramtypes", [UserDomainFacade,
        LoggerService,
        AuthorizationDomainFacade,
        AuthenticationDomainFacade])
], AuthorizationByUserController);
export { AuthorizationByUserController };
