import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { PostDataDomainModule } from './postData/domain'

import { LikeDomainModule } from './like/domain'

import { CommentDomainModule } from './comment/domain'

import { GroupDomainModule } from './group/domain'

import { GroupMemberDomainModule } from './groupMember/domain'

import { GroupPostDomainModule } from './groupPost/domain'

import { GroupPostLikeDomainModule } from './groupPostLike/domain'

import { GroupPostCommentDomainModule } from './groupPostComment/domain'

import { DirectMessageDomainModule } from './directMessage/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    PostDataDomainModule,

    LikeDomainModule,

    CommentDomainModule,

    GroupDomainModule,

    GroupMemberDomainModule,

    GroupPostDomainModule,

    GroupPostLikeDomainModule,

    GroupPostCommentDomainModule,

    DirectMessageDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
