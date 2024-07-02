import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { GroupDomainFacade } from './group.domain.facade'
import { Group } from './group.model'

@Module({
  imports: [TypeOrmModule.forFeature([Group]), DatabaseHelperModule],
  providers: [GroupDomainFacade, GroupDomainFacade],
  exports: [GroupDomainFacade],
})
export class GroupDomainModule {}
