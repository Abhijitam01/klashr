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
import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { RequestHelper } from "../../../helpers/request";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { NotificationDomainFacade } from '../domain';
let NotificationByMeController = class NotificationByMeController {
    notificationDomainFacade;
    authenticationDomainFacade;
    constructor(notificationDomainFacade, authenticationDomainFacade) {
        this.notificationDomainFacade = notificationDomainFacade;
        this.authenticationDomainFacade = authenticationDomainFacade;
    }
    async findManyByMe(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = payload.user;
        const notifications = await this.notificationDomainFacade.findManyByUser(user, queryOptions);
        return notifications;
    }
    async deleteOne(request, notificationId) {
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = payload.user;
        const notification = await this.notificationDomainFacade.findOneByIdAndUserOrFail(notificationId, user);
        await this.notificationDomainFacade.delete(notification);
        return {};
    }
    async deleteAll(request) {
        const queryOptions = RequestHelper.getQueryOptions(request);
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = payload.user;
        const notifications = await this.notificationDomainFacade.findManyByUser(user, queryOptions);
        await this.notificationDomainFacade.deleteMany(notifications);
        return {};
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationByMeController.prototype, "findManyByMe", null);
__decorate([
    Delete('/:notificationId'),
    __param(0, Req()),
    __param(1, Param('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationByMeController.prototype, "deleteOne", null);
__decorate([
    Delete(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationByMeController.prototype, "deleteAll", null);
NotificationByMeController = __decorate([
    Controller('/v1/users/me/notifications'),
    __metadata("design:paramtypes", [NotificationDomainFacade,
        AuthenticationDomainFacade])
], NotificationByMeController);
export { NotificationByMeController };
