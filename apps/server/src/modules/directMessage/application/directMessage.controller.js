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
import { EventService } from "../../../libraries/event";
import { DirectMessageDomainFacade, } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { DirectMessageApplicationEvent } from './directMessage.application.event';
import { DirectMessageCreateDto, DirectMessageUpdateDto, } from './directMessage.dto';
let DirectMessageController = class DirectMessageController {
    eventService;
    directMessageDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, directMessageDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.directMessageDomainFacade = directMessageDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.directMessageDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.directMessageDomainFacade.create(body);
        await this.eventService.emit(DirectMessageApplicationEvent.DirectMessageCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(directMessageId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.directMessageDomainFacade.findOneByIdOrFail(directMessageId, queryOptions);
        return item;
    }
    async update(directMessageId, body) {
        const item = await this.directMessageDomainFacade.findOneByIdOrFail(directMessageId);
        const itemUpdated = await this.directMessageDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(directMessageId) {
        const item = await this.directMessageDomainFacade.findOneByIdOrFail(directMessageId);
        await this.directMessageDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DirectMessageController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessageCreateDto, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageController.prototype, "create", null);
__decorate([
    Get('/:directMessageId'),
    __param(0, Param('directMessageId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DirectMessageController.prototype, "findOne", null);
__decorate([
    Patch('/:directMessageId'),
    __param(0, Param('directMessageId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DirectMessageUpdateDto]),
    __metadata("design:returntype", Promise)
], DirectMessageController.prototype, "update", null);
__decorate([
    Delete('/:directMessageId'),
    __param(0, Param('directMessageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DirectMessageController.prototype, "delete", null);
DirectMessageController = __decorate([
    Controller('/v1/directMessages'),
    __metadata("design:paramtypes", [EventService,
        DirectMessageDomainFacade,
        AuthenticationDomainFacade])
], DirectMessageController);
export { DirectMessageController };
