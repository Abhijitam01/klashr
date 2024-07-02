import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { LikeDomainFacade } from './like.domain.facade'
import { Like } from './like.model'

@Module({
  imports: [TypeOrmModule.forFeature([Like]), DatabaseHelperModule],
  providers: [LikeDomainFacade, LikeDomainFacade],
  exports: [LikeDomainFacade],
})
export class LikeDomainModule {}
