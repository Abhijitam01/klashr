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
import { CommentDomainFacade } from "../domain";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { CommentApplicationEvent } from './comment.application.event';
import { CommentCreateDto } from './comment.dto';
import { PostDataDomainFacade } from '../../postData/domain';
let CommentByPostDataController = class CommentByPostDataController {
    postDataDomainFacade;
    commentDomainFacade;
    eventService;
    authenticationDomainFacade;
    constructor(postDataDomainFacade, commentDomainFacade, eventService, authenticationDomainFacade) {
        this.postDataDomainFacade = postDataDomainFacade;
        this.commentDomainFacade = commentDomainFacade;
        this.eventService = eventService;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyPostId(postId, request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const parent = await this.postDataDomainFacade.findOneByIdOrFail(postId);
        const items = await this.commentDomainFacade.findManyByPost(parent, queryOptions);
        return items;
    }
    async createByPostId(postId, body, request) {
        const { user } = this.authenticationDomainFacade.getRequestPayload(request);
        const valuesUpdated = { ...body, postId };
        const item = await this.commentDomainFacade.create(valuesUpdated);
        await this.eventService.emit(CommentApplicationEvent.CommentCreated.key, {
            id: item.id,
            userId: user.id,
        });
        return item;
    }
};
__decorate([
    Get('/post/:postId/comments'),
    __param(0, Param('postId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentByPostDataController.prototype, "findManyPostId", null);
__decorate([
    Post('/post/:postId/comments'),
    __param(0, Param('postId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommentCreateDto, Object]),
    __metadata("design:returntype", Promise)
], CommentByPostDataController.prototype, "createByPostId", null);
CommentByPostDataController = __decorate([
    Controller('/v1/postDatas'),
    __metadata("design:paramtypes", [PostDataDomainFacade,
        CommentDomainFacade,
        EventService,
        AuthenticationDomainFacade])
], CommentByPostDataController);
export { CommentByPostDataController };
