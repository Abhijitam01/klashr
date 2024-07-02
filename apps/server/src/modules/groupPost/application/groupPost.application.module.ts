import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupPostDomainModule } from '../domain'
import { GroupPostController } from './groupPost.controller'

import { GroupDomainModule } from '../../../modules/group/domain'

import { GroupPostByGroupController } from './groupPostByGroup.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GroupPostByUserController } from './groupPostByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    GroupPostDomainModule,

    GroupDomainModule,

    UserDomainModule,
  ],
  controllers: [
    GroupPostController,

    GroupPostByGroupController,

    GroupPostByUserController,
  ],
  providers: [],
})
export class GroupPostApplicationModule {}
