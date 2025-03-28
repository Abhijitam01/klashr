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
import { DirectMessageDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { DirectMessageApplicationEvent } from './directMessage.application.event';
import { DirectMessageCreateDto } from './directMessage.dto';
import { UserDomainFacade } from '../../user/domain';
let DirectMessageByUserController = class DirectMessageByUserController {
    userDomainFacade;
    directMessageDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(userDomainFacade, directMessageDomainFacade, eventService, authenticationDomainFacade) {
        this.userDomainFacade = userDomainFacade;
        this.directMessageDomainFacade = directMessageDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManySenderId(senderId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.userDomainFacade.findOneByIdOrFail(senderId);
        const items = await this.directMessageDomainFacade.findManyBySender(parent, queryOptions);
        return items;
    }
    async createBySenderId(senderId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, senderId };
        const item = await this.directMessageDomainFacade.create(valuesUpdated);
        await this.eventService.emit(DirectMessageApplicationEvent.DirectMessageCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findManyReceiverId(receiverId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.userDomainFacade.findOneByIdOrFail(receiverId);
        const items = await this.directMessageDomainFacade.findManyByReceiver(parent, queryOptions);
        return items;
    }
    async createByReceiverId(receiverId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, receiverId };
        const item = await this.directMessageDomainFacade.create(valuesUpdated);
        await this.eventService.emit(DirectMessageApplicationEvent.DirectMessageCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/sender/:senderId/directMessages'),
    __param(0, Param('senderId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageByUserController.prototype, "findManySenderId", null);
__decorate([
    Post('/sender/:senderId/directMessages'),
    __param(0, Param('senderId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DirectMessageCreateDto, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageByUserController.prototype, "createBySenderId", null);
__decorate([
    Get('/receiver/:receiverId/directMessages'),
    __param(0, Param('receiverId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageByUserController.prototype, "findManyReceiverId", null);
__decorate([
    Post('/receiver/:receiverId/directMessages'),
    __param(0, Param('receiverId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DirectMessageCreateDto, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageByUserController.prototype, "createByReceiverId", null);
DirectMessageByUserController = __decorate([
    Controller('/v1/users'),
    __metadata("design:paramtypes", [UserDomainFacade,
        DirectMessageDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], DirectMessageByUserController);
export { DirectMessageByUserController };
