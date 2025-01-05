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
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RequestHelper } from "../../../helpers/request";
import { EventService } from "../../../libraries/event";
import { LikeDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { LikeApplicationEvent } from './like.application.event';
import { LikeCreateDto } from './like.dto';
import { UserDomainFacade } from '../../user/domain';
let LikeByUserController = class LikeByUserController {
    userDomainFacade;
    likeDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(userDomainFacade, likeDomainFacade, eventService, authenticationDomainFacade) {
        this.userDomainFacade = userDomainFacade;
        this.likeDomainFacade = likeDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyUserId(userId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.userDomainFacade.findOneByIdOrFail(userId);
        const items = await this.likeDomainFacade.findManyByUser(parent, queryOptions);
        return items;
    }
    async createByUserId(userId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, userId };
        const item = await this.likeDomainFacade.create(valuesUpdated);
        await this.eventService.emit(LikeApplicationEvent.LikeCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/user/:userId/likes'),
    __param(0, Param('userId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LikeByUserController.prototype, "findManyUserId", null);
__decorate([
    Post('/user/:userId/likes'),
    __param(0, Param('userId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LikeCreateDto, Object]),
    __metadata("design:returntype", Promise)
], LikeByUserController.prototype, "createByUserId", null);
LikeByUserController = __decorate([
    Controller('/v1/users'),
    __metadata("design:paramtypes", [UserDomainFacade,
        LikeDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], LikeByUserController);
export { LikeByUserController };
