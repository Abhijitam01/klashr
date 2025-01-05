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
import { GroupPostLikeDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { GroupPostLikeApplicationEvent } from './groupPostLike.application.event';
import { GroupPostLikeCreateDto } from './groupPostLike.dto';
import { GroupPostDomainFacade } from '../../groupPost/domain';
let GroupPostLikeByGroupPostController = class GroupPostLikeByGroupPostController {
    groupPostDomainFacade;
    groupPostLikeDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(groupPostDomainFacade, groupPostLikeDomainFacade, eventService, authenticationDomainFacade) {
        this.groupPostDomainFacade = groupPostDomainFacade;
        this.groupPostLikeDomainFacade = groupPostLikeDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyGroupPostId(groupPostId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId);
        const items = await this.groupPostLikeDomainFacade.findManyByGroupPost(parent, queryOptions);
        return items;
    }
    async createByGroupPostId(groupPostId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, groupPostId };
        const item = await this.groupPostLikeDomainFacade.create(valuesUpdated);
        await this.eventService.emit(GroupPostLikeApplicationEvent.GroupPostLikeCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/groupPost/:groupPostId/groupPostLikes'),
    __param(0, Param('groupPostId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostLikeByGroupPostController.prototype, "findManyGroupPostId", null);
__decorate([
    Post('/groupPost/:groupPostId/groupPostLikes'),
    __param(0, Param('groupPostId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostLikeCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostLikeByGroupPostController.prototype, "createByGroupPostId", null);
GroupPostLikeByGroupPostController = __decorate([
    Controller('/v1/groupPosts'),
    __metadata("design:paramtypes", [GroupPostDomainFacade,
        GroupPostLikeDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], GroupPostLikeByGroupPostController);
export { GroupPostLikeByGroupPostController };
