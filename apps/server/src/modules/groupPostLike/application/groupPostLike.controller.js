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
import { GroupPostLikeDomainFacade, } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { GroupPostLikeApplicationEvent } from './groupPostLike.application.event';
import { GroupPostLikeCreateDto, GroupPostLikeUpdateDto, } from './groupPostLike.dto';
let GroupPostLikeController = class GroupPostLikeController {
    eventService;
    groupPostLikeDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, groupPostLikeDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.groupPostLikeDomainFacade = groupPostLikeDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.groupPostLikeDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.groupPostLikeDomainFacade.create(body);
        await this.eventService.emit(GroupPostLikeApplicationEvent.GroupPostLikeCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(groupPostLikeId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.groupPostLikeDomainFacade.findOneByIdOrFail(groupPostLikeId, queryOptions);
        return item;
    }
    async update(groupPostLikeId, body) {
        const item = await this.groupPostLikeDomainFacade.findOneByIdOrFail(groupPostLikeId);
        const itemUpdated = await this.groupPostLikeDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(groupPostLikeId) {
        const item = await this.groupPostLikeDomainFacade.findOneByIdOrFail(groupPostLikeId);
        await this.groupPostLikeDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupPostLikeController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupPostLikeCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostLikeController.prototype, "create", null);
__decorate([
    Get('/:groupPostLikeId'),
    __param(0, Param('groupPostLikeId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostLikeController.prototype, "findOne", null);
__decorate([
    Patch('/:groupPostLikeId'),
    __param(0, Param('groupPostLikeId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostLikeUpdateDto]),
    __metadata("design:returntype", Promise)
], GroupPostLikeController.prototype, "update", null);
__decorate([
    Delete('/:groupPostLikeId'),
    __param(0, Param('groupPostLikeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupPostLikeController.prototype, "delete", null);
GroupPostLikeController = __decorate([
    Controller('/v1/groupPostLikes'),
    __metadata("design:paramtypes", [EventService,
        GroupPostLikeDomainFacade,
        AuthenticationDomainFacade])
], GroupPostLikeController);
export { GroupPostLikeController };
