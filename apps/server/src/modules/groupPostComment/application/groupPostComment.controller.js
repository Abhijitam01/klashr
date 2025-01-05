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
import { GroupPostCommentDomainFacade, } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { GroupPostCommentApplicationEvent } from './groupPostComment.application.event';
import { GroupPostCommentCreateDto, GroupPostCommentUpdateDto, } from './groupPostComment.dto';
let GroupPostCommentController = class GroupPostCommentController {
    eventService;
    groupPostCommentDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, groupPostCommentDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.groupPostCommentDomainFacade = groupPostCommentDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.groupPostCommentDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.groupPostCommentDomainFacade.create(body);
        await this.eventService.emit(GroupPostCommentApplicationEvent.GroupPostCommentCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(groupPostCommentId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.groupPostCommentDomainFacade.findOneByIdOrFail(groupPostCommentId, queryOptions);
        return item;
    }
    async update(groupPostCommentId, body) {
        const item = await this.groupPostCommentDomainFacade.findOneByIdOrFail(groupPostCommentId);
        const itemUpdated = await this.groupPostCommentDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(groupPostCommentId) {
        const item = await this.groupPostCommentDomainFacade.findOneByIdOrFail(groupPostCommentId);
        await this.groupPostCommentDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupPostCommentController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupPostCommentCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostCommentController.prototype, "create", null);
__decorate([
    Get('/:groupPostCommentId'),
    __param(0, Param('groupPostCommentId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostCommentController.prototype, "findOne", null);
__decorate([
    Patch('/:groupPostCommentId'),
    __param(0, Param('groupPostCommentId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostCommentUpdateDto]),
    __metadata("design:returntype", Promise)
], GroupPostCommentController.prototype, "update", null);
__decorate([
    Delete('/:groupPostCommentId'),
    __param(0, Param('groupPostCommentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupPostCommentController.prototype, "delete", null);
GroupPostCommentController = __decorate([
    Controller('/v1/groupPostComments'),
    __metadata("design:paramtypes", [EventService,
        GroupPostCommentDomainFacade,
        AuthenticationDomainFacade])
], GroupPostCommentController);
export { GroupPostCommentController };
