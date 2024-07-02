import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { PostDataApplicationModule } from './postData/application'

import { LikeApplicationModule } from './like/application'

import { CommentApplicationModule } from './comment/application'

import { GroupApplicationModule } from './group/application'

import { GroupMemberApplicationModule } from './groupMember/application'

import { GroupPostApplicationModule } from './groupPost/application'

import { GroupPostLikeApplicationModule } from './groupPostLike/application'

import { GroupPostCommentApplicationModule } from './groupPostComment/application'

import { DirectMessageApplicationModule } from './directMessage/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    PostDataApplicationModule,

    LikeApplicationModule,

    CommentApplicationModule,

    GroupApplicationModule,

    GroupMemberApplicationModule,

    GroupPostApplicationModule,

    GroupPostLikeApplicationModule,

    GroupPostCommentApplicationModule,

    DirectMessageApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
