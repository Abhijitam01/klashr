import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GroupMemberDomainFacade } from './groupMember.domain.facade'
import { GroupMember } from './groupMember.model'

@Module({
  imports: [TypeOrmModule.forFeature([GroupMember]), DatabaseHelperModule],
  providers: [GroupMemberDomainFacade, GroupMemberDomainFacade],
  exports: [GroupMemberDomainFacade],
})
export class GroupMemberDomainModule {}
