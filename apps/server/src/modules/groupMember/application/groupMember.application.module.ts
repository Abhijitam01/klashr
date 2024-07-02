import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupMemberDomainModule } from '../domain'
import { GroupMemberController } from './groupMember.controller'

import { GroupDomainModule } from '../../../modules/group/domain'

import { GroupMemberByGroupController } from './groupMemberByGroup.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GroupMemberByUserController } from './groupMemberByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    GroupMemberDomainModule,

    GroupDomainModule,

    UserDomainModule,
  ],
  controllers: [
    GroupMemberController,

    GroupMemberByGroupController,

    GroupMemberByUserController,
  ],
  providers: [],
})
export class GroupMemberApplicationModule {}
