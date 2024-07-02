import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DirectMessageDomainModule } from '../domain'
import { DirectMessageController } from './directMessage.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DirectMessageByUserController } from './directMessageByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DirectMessageDomainModule,

    UserDomainModule,
  ],
  controllers: [DirectMessageController, DirectMessageByUserController],
  providers: [],
})
export class DirectMessageApplicationModule {}
