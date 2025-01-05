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
import { CommentDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { RequestHelper } from '../../../helpers/request';
import { CommentApplicationEvent } from './comment.application.event';
import { CommentCreateDto, CommentUpdateDto } from './comment.dto';
let CommentController = class CommentController {
    eventService;
    commentDomainFacade;
    authenticationDomainFacade;
    constructor(eventService, commentDomainFacade, authenticationDomainFacade) {
        this.eventService = eventService;
        this.commentDomainFacade = commentDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findMany(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const items = await this.commentDomainFacade.findMany(queryOptions);
        return items;
    }
    async create(body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const item = await this.commentDomainFacade.create(body);
        await this.eventService.emit(CommentApplicationEvent.CommentCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
    async findOne(commentId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const item = await this.commentDomainFacade.findOneByIdOrFail(commentId, queryOptions);
        return item;
    }
    async update(commentId, body) {
        const item = await this.commentDomainFacade.findOneByIdOrFail(commentId);
        const itemUpdated = await this.commentDomainFacade.update(item, body);
        return itemUpdated;
    }
    async delete(commentId) {
        const item = await this.commentDomainFacade.findOneByIdOrFail(commentId);
        await this.commentDomainFacade.delete(item);
        return item;
    }
};
__decorate([
    Get('/'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findMany", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentCreateDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    Get('/:commentId'),
    __param(0, Param('commentId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    Patch('/:commentId'),
    __param(0, Param('commentId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommentUpdateDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    Delete('/:commentId'),
    __param(0, Param('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
CommentController = __decorate([
    Controller('/v1/comments'),
    __metadata("design:paramtypes", [EventService,
        CommentDomainFacade,
        AuthenticationDomainFacade])
], CommentController);
export { CommentController };
