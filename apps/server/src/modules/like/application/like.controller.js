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
import { LikeDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { LikeApplicationEvent } from './like.application.event';
import { LikeCreateDto, LikeUpdateDto } from './like.dto';
let LikeController = class LikeController {
    eventService;
    likeDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, likeDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.likeDomainFacade = likeDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.likeDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.likeDomainFacade.create(body);
        await this.eventService.emit(LikeApplicationEvent.LikeCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(likeId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.likeDomainFacade.findOneByIdOrFail(likeId, queryOptions);
        return item;
    }
    async update(likeId, body) {
        const item = await this.likeDomainFacade.findOneByIdOrFail(likeId);
        const itemUpdated = await this.likeDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(likeId) {
        const item = await this.likeDomainFacade.findOneByIdOrFail(likeId);
        await this.likeDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LikeCreateDto, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "create", null);
__decorate([
    Get('/:likeId'),
    __param(0, Param('likeId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findOne", null);
__decorate([
    Patch('/:likeId'),
    __param(0, Param('likeId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LikeUpdateDto]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "update", null);
__decorate([
    Delete('/:likeId'),
    __param(0, Param('likeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "delete", null);
LikeController = __decorate([
    Controller('/v1/likes'),
    __metadata("design:paramtypes", [EventService,
        LikeDomainFacade,
        AuthenticationDomainFacade])
], LikeController);
export { LikeController };
