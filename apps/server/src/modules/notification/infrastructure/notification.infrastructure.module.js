var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SocketModule } from "../../../libraries/socket";
import { AuthorizationDomainModule } from "../../authorization/domain";
import { NotificationDomainModule } from '../domain';
import { NotificationPostDataSubscriber } from './subscribers/notification.postData.subscriber';
import { NotificationLikeSubscriber } from './subscribers/notification.like.subscriber';
import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber';
import { NotificationGroupSubscriber } from './subscribers/notification.group.subscriber';
import { NotificationGroupMemberSubscriber } from './subscribers/notification.groupMember.subscriber';
import { NotificationGroupPostSubscriber } from './subscribers/notification.groupPost.subscriber';
import { NotificationGroupPostLikeSubscriber } from './subscribers/notification.groupPostLike.subscriber';
import { NotificationGroupPostCommentSubscriber } from './subscribers/notification.groupPostComment.subscriber';
import { NotificationDirectMessageSubscriber } from './subscribers/notification.directMessage.subscriber';
let NotificationInfrastructureModule = class NotificationInfrastructureModule {
};
NotificationInfrastructureModule = __decorate([
    Module({
        imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
        providers: [
            NotificationPostDataSubscriber,
            NotificationLikeSubscriber,
            NotificationCommentSubscriber,
            NotificationGroupSubscriber,
            NotificationGroupMemberSubscriber,
            NotificationGroupPostSubscriber,
            NotificationGroupPostLikeSubscriber,
            NotificationGroupPostCommentSubscriber,
            NotificationDirectMessageSubscriber,
        ],
        exports: [],
    })
], NotificationInfrastructureModule);
export { NotificationInfrastructureModule };
