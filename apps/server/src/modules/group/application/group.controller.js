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
import { GroupDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { GroupApplicationEvent } from './group.application.event';
import { GroupCreateDto, GroupUpdateDto } from './group.dto';
let GroupController = class GroupController {
    eventService;
    groupDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, groupDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.groupDomainFacade = groupDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.groupDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.groupDomainFacade.create(body);
        await this.eventService.emit(GroupApplicationEvent.GroupCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(groupId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.groupDomainFacade.findOneByIdOrFail(groupId, queryOptions);
        return item;
    }
    async update(groupId, body) {
        const item = await this.groupDomainFacade.findOneByIdOrFail(groupId);
        const itemUpdated = await this.groupDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(groupId) {
        const item = await this.groupDomainFacade.findOneByIdOrFail(groupId);
        await this.groupDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GroupCreateDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    Get('/:groupId'),
    __param(0, Param('groupId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findOne", null);
__decorate([
    Patch('/:groupId'),
    __param(0, Param('groupId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, GroupUpdateDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "update", null);
__decorate([
    Delete('/:groupId'),
    __param(0, Param('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "delete", null);
GroupController = __decorate([
    Controller('/v1/groups'),
    __metadata("design:paramtypes", [EventService,
        GroupDomainFacade,
        AuthenticationDomainFacade])
], GroupController);
export { GroupController };
