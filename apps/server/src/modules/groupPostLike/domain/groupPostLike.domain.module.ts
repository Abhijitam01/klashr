import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GroupPostLikeDomainFacade } from './groupPostLike.domain.facade'
import { GroupPostLike } from './groupPostLike.model'

@Module({
  imports: [TypeOrmModule.forFeature([GroupPostLike]), DatabaseHelperModule],
  providers: [GroupPostLikeDomainFacade, GroupPostLikeDomainFacade],
  exports: [GroupPostLikeDomainFacade],
})
export class GroupPostLikeDomainModule {}
