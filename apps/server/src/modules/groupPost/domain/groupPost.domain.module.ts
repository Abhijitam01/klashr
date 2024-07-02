import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GroupPostDomainFacade } from './groupPost.domain.facade'
import { GroupPost } from './groupPost.model'

@Module({
  imports: [TypeOrmModule.forFeature([GroupPost]), DatabaseHelperModule],
  providers: [GroupPostDomainFacade, GroupPostDomainFacade],
  exports: [GroupPostDomainFacade],
})
export class GroupPostDomainModule {}
