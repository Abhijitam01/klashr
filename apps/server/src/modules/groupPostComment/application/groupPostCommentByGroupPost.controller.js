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
import { GroupPostCommentDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { GroupPostCommentApplicationEvent } from './groupPostComment.application.event';
import { GroupPostCommentCreateDto } from './groupPostComment.dto';
import { GroupPostDomainFacade } from '../../groupPost/domain';
let GroupPostCommentByGroupPostController = class GroupPostCommentByGroupPostController {
    groupPostDomainFacade;
    groupPostCommentDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(groupPostDomainFacade, groupPostCommentDomainFacade, eventService, authenticationDomainFacade) {
        this.groupPostDomainFacade = groupPostDomainFacade;
        this.groupPostCommentDomainFacade = groupPostCommentDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyGroupPostId(groupPostId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId);
        const items = await this.groupPostCommentDomainFacade.findManyByGroupPost(parent, queryOptions);
        return items;
    }
    async createByGroupPostId(groupPostId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, groupPostId };
        const item = await this.groupPostCommentDomainFacade.create(valuesUpdated);
        await this.eventService.emit(GroupPostCommentApplicationEvent.GroupPostCommentCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/groupPost/:groupPostId/groupPostComments'),
    __param(0, Param('groupPostId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostCommentByGroupPostController.prototype, "findManyGroupPostId", null);
__decorate([
    Post('/groupPost/:groupPostId/groupPostComments'),
    __param(0, Param('groupPostId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostCommentCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostCommentByGroupPostController.prototype, "createByGroupPostId", null);
GroupPostCommentByGroupPostController = __decorate([
    Controller('/v1/groupPosts'),
    __metadata("design:paramtypes", [GroupPostDomainFacade,
        GroupPostCommentDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], GroupPostCommentByGroupPostController);
export { GroupPostCommentByGroupPostController };
