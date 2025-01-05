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
import { GroupPostDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { GroupPostApplicationEvent } from './groupPost.application.event';
import { GroupPostCreateDto } from './groupPost.dto';
import { GroupDomainFacade } from '../../group/domain';
let GroupPostByGroupController = class GroupPostByGroupController {
    groupDomainFacade;
    groupPostDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(groupDomainFacade, groupPostDomainFacade, eventService, authenticationDomainFacade) {
        this.groupDomainFacade = groupDomainFacade;
        this.groupPostDomainFacade = groupPostDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyGroupId(groupId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId);
        const items = await this.groupPostDomainFacade.findManyByGroup(parent, queryOptions);
        return items;
    }
    async createByGroupId(groupId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, groupId };
        const item = await this.groupPostDomainFacade.create(valuesUpdated);
        await this.eventService.emit(GroupPostApplicationEvent.GroupPostCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/group/:groupId/groupPosts'),
    __param(0, Param('groupId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupPostByGroupController.prototype, "findManyGroupId", null);
__decorate([
    Post('/group/:groupId/groupPosts'),
    __param(0, Param('groupId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupPostCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupPostByGroupController.prototype, "createByGroupId", null);
GroupPostByGroupController = __decorate([
    Controller('/v1/groups'),
    __metadata("design:paramtypes", [GroupDomainFacade,
        GroupPostDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], GroupPostByGroupController);
export { GroupPostByGroupController };
