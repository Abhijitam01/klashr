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
import { GroupMemberDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { GroupMemberApplicationEvent } from './groupMember.application.event';
import { GroupMemberCreateDto } from './groupMember.dto';
import { GroupDomainFacade } from '../../group/domain';
let GroupMemberByGroupController = class GroupMemberByGroupController {
    groupDomainFacade;
    groupMemberDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(groupDomainFacade, groupMemberDomainFacade, eventService, authenticationDomainFacade) {
        this.groupDomainFacade = groupDomainFacade;
        this.groupMemberDomainFacade = groupMemberDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyGroupId(groupId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId);
        const items = await this.groupMemberDomainFacade.findManyByGroup(parent, queryOptions);
        return items;
    }
    async createByGroupId(groupId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, groupId };
        const item = await this.groupMemberDomainFacade.create(valuesUpdated);
        await this.eventService.emit(GroupMemberApplicationEvent.GroupMemberCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/group/:groupId/groupMembers'),
    __param(0, Param('groupId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupMemberByGroupController.prototype, "findManyGroupId", null);
__decorate([
    Post('/group/:groupId/groupMembers'),
    __param(0, Param('groupId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupMemberCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupMemberByGroupController.prototype, "createByGroupId", null);
GroupMemberByGroupController = __decorate([
    Controller('/v1/groups'),
    __metadata("design:paramtypes", [GroupDomainFacade,
        GroupMemberDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], GroupMemberByGroupController);
export { GroupMemberByGroupController };
