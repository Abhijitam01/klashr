import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupPostLikeDomainModule } from '../domain'
import { GroupPostLikeController } from './groupPostLike.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GroupPostLikeByUserController } from './groupPostLikeByUser.controller'

import { GroupPostDomainModule } from '../../../modules/groupPost/domain'

import { GroupPostLikeByGroupPostController } from './groupPostLikeByGroupPost.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    GroupPostLikeDomainModule,

    UserDomainModule,

    GroupPostDomainModule,
  ],
  controllers: [
    GroupPostLikeController,

    GroupPostLikeByUserController,

    GroupPostLikeByGroupPostController,
  ],
  providers: [],
})
export class GroupPostLikeApplicationModule {}
