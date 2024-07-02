import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationPostDataSubscriber } from './subscribers/notification.postData.subscriber'

import { NotificationLikeSubscriber } from './subscribers/notification.like.subscriber'

import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber'

import { NotificationGroupSubscriber } from './subscribers/notification.group.subscriber'

import { NotificationGroupMemberSubscriber } from './subscribers/notification.groupMember.subscriber'

import { NotificationGroupPostSubscriber } from './subscribers/notification.groupPost.subscriber'

import { NotificationGroupPostLikeSubscriber } from './subscribers/notification.groupPostLike.subscriber'

import { NotificationGroupPostCommentSubscriber } from './subscribers/notification.groupPostComment.subscriber'

import { NotificationDirectMessageSubscriber } from './subscribers/notification.directMessage.subscriber'

@Module({
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
export class NotificationInfrastructureModule {}
