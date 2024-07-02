import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupDomainModule } from '../domain'
import { GroupController } from './group.controller'

@Module({
  imports: [AuthenticationDomainModule, GroupDomainModule],
  controllers: [GroupController],
  providers: [],
})
export class GroupApplicationModule {}
