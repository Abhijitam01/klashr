import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DirectMessageDomainFacade } from './directMessage.domain.facade'
import { DirectMessage } from './directMessage.model'

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessage]), DatabaseHelperModule],
  providers: [DirectMessageDomainFacade, DirectMessageDomainFacade],
  exports: [DirectMessageDomainFacade],
})
export class DirectMessageDomainModule {}
