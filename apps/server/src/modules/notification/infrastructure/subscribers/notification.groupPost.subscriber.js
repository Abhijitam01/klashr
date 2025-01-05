var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SocketService } from "../../../../libraries/socket";
import { GroupPostApplicationEvent } from "../../../groupPost/application";
import { AuthorizationDomainFacade } from "../../../authorization/domain";
import { NotificationDomainFacade, } from "../../domain";
let NotificationGroupPostSubscriber = class NotificationGroupPostSubscriber {
    notificationDomainFacade;
    authorizationDomainFacade;
    socketService;
    constructor(notificationDomainFacade, authorizationDomainFacade, socketService) {
        this.notificationDomainFacade = notificationDomainFacade;
        this.authorizationDomainFacade = authorizationDomainFacade;
        this.socketService = socketService;
    }
    async handleCreation(data) {
        const values = {
            title: 'Admin',
            message: 'A new groupPost has been created',
            senderName: 'API',
        };
        const role = await this.authorizationDomainFacade.role.findOneByNameOrFail('admin');
        for (const { userId } of role.roleUsers) {
            const isCreator = userId === data.userId;
            if (isCreator) {
                continue;
            }
            const notification = await this.notificationDomainFacade.create({
                ...values,
                userId,
            });
            this.socketService.send(userId, 'notification.created', notification);
        }
    }
};
__decorate([
    OnEvent(GroupPostApplicationEvent.GroupPostCreated.key),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationGroupPostSubscriber.prototype, "handleCreation", null);
NotificationGroupPostSubscriber = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NotificationDomainFacade,
        AuthorizationDomainFacade,
        SocketService])
], NotificationGroupPostSubscriber);
export { NotificationGroupPostSubscriber };
