import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupPostCommentDomainModule } from '../domain'
import { GroupPostCommentController } from './groupPostComment.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GroupPostCommentByUserController } from './groupPostCommentByUser.controller'

import { GroupPostDomainModule } from '../../../modules/groupPost/domain'

import { GroupPostCommentByGroupPostController } from './groupPostCommentByGroupPost.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    GroupPostCommentDomainModule,

    UserDomainModule,

    GroupPostDomainModule,
  ],
  controllers: [
    GroupPostCommentController,

    GroupPostCommentByUserController,

    GroupPostCommentByGroupPostController,
  ],
  providers: [],
})
export class GroupPostCommentApplicationModule {}
