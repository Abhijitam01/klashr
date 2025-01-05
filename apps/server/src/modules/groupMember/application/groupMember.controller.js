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
import { GroupMemberDomainFacade, } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { GroupMemberApplicationEvent } from './groupMember.application.event';
import { GroupMemberCreateDto, GroupMemberUpdateDto } from './groupMember.dto';
let GroupMemberController = class GroupMemberController {
    eventService;
    groupMemberDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, groupMemberDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.groupMemberDomainFacade = groupMemberDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.groupMemberDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.groupMemberDomainFacade.create(body);
        await this.eventService.emit(GroupMemberApplicationEvent.GroupMemberCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(groupMemberId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.groupMemberDomainFacade.findOneByIdOrFail(groupMemberId, queryOptions);
        return item;
    }
    async update(groupMemberId, body) {
        const item = await this.groupMemberDomainFacade.findOneByIdOrFail(groupMemberId);
        const itemUpdated = await this.groupMemberDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(groupMemberId) {
        const item = await this.groupMemberDomainFacade.findOneByIdOrFail(groupMemberId);
        await this.groupMemberDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupMemberCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "create", null);
__decorate([
    Get('/:groupMemberId'),
    __param(0, Param('groupMemberId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "findOne", null);
__decorate([
    Patch('/:groupMemberId'),
    __param(0, Param('groupMemberId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupMemberUpdateDto]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "update", null);
__decorate([
    Delete('/:groupMemberId'),
    __param(0, Param('groupMemberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupMemberController.prototype, "delete", null);
GroupMemberController = __decorate([
    Controller('/v1/groupMembers'),
    __metadata("design:paramtypes", [EventService,
        GroupMemberDomainFacade,
        AuthenticationDomainFacade])
], GroupMemberController);
export { GroupMemberController };
