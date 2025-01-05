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
import { PostDataDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { PostDataApplicationEvent } from './postData.application.event';
import { PostDataCreateDto, PostDataUpdateDto } from './postData.dto';
let PostDataController = class PostDataController {
    eventService;
    postDataDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, postDataDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.postDataDomainFacade = postDataDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.postDataDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.postDataDomainFacade.create(body);
        await this.eventService.emit(PostDataApplicationEvent.PostDataCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(postDataId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.postDataDomainFacade.findOneByIdOrFail(postDataId, queryOptions);
        return item;
    }
    async update(postDataId, body) {
        const item = await this.postDataDomainFacade.findOneByIdOrFail(postDataId);
        const itemUpdated = await this.postDataDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(postDataId) {
        const item = await this.postDataDomainFacade.findOneByIdOrFail(postDataId);
        await this.postDataDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostDataController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostDataCreateDto, Object]),
    __metadata("design:returntype", Promise)
], PostDataController.prototype, "create", null);
__decorate([
    Get('/:postDataId'),
    __param(0, Param('postDataId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostDataController.prototype, "findOne", null);
__decorate([
    Patch('/:postDataId'),
    __param(0, Param('postDataId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PostDataUpdateDto]),
    __metadata("design:returntype", Promise)
], PostDataController.prototype, "update", null);
__decorate([
    Delete('/:postDataId'),
    __param(0, Param('postDataId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostDataController.prototype, "delete", null);
PostDataController = __decorate([
    Controller('/v1/postDatas'),
    __metadata("design:paramtypes", [EventService,
        PostDataDomainFacade,
        AuthenticationDomainFacade])
], PostDataController);
export { PostDataController };
