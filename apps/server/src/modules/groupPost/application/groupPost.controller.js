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
import { GroupPostDomainFacade, } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { GroupPostApplicationEvent } from './groupPost.application.event';
import { GroupPostCreateDto, GroupPostUpdateDto } from './groupPost.dto';
let GroupPostController = class GroupPostController {
    eventService;
    groupPostDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, groupPostDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.groupPostDomainFacade = groupPostDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.groupPostDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.groupPostDomainFacade.create(body);
        await this.eventService.emit(GroupPostApplicationEvent.GroupPostCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(groupPostId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId, queryOptions);
        return item;
    }
    async update(groupPostId, body) {
        const item = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId);
        const itemUpdated = await this.groupPostDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(groupPostId) {
        const item = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId);
        await this.groupPostDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupPostController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupPostCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostController.prototype, "create", null);
__decorate([
    Get('/:groupPostId'),
    __param(0, Param('groupPostId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostController.prototype, "findOne", null);
__decorate([
    Patch('/:groupPostId'),
    __param(0, Param('groupPostId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostUpdateDto]),
    __metadata("design:returntype", Promise)
], GroupPostController.prototype, "update", null);
__decorate([
    Delete('/:groupPostId'),
    __param(0, Param('groupPostId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupPostController.prototype, "delete", null);
GroupPostController = __decorate([
    Controller('/v1/groupPosts'),
    __metadata("design:paramtypes", [EventService,
        GroupPostDomainFacade,
        AuthenticationDomainFacade])
], GroupPostController);
export { GroupPostController };
