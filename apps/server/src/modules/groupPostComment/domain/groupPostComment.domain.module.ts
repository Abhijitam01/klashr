import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GroupPostCommentDomainFacade } from './groupPostComment.domain.facade'
import { GroupPostComment } from './groupPostComment.model'

@Module({
  imports: [TypeOrmModule.forFeature([GroupPostComment]), DatabaseHelperModule],
  providers: [GroupPostCommentDomainFacade, GroupPostCommentDomainFacade],
  exports: [GroupPostCommentDomainFacade],
})
export class GroupPostCommentDomainModule {}
