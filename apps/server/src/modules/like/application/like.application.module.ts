import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LikeDomainModule } from '../domain'
import { LikeController } from './like.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { LikeByUserController } from './likeByUser.controller'

import { PostDataDomainModule } from '../../../modules/postData/domain'

import { LikeByPostDataController } from './likeByPostData.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LikeDomainModule,

    UserDomainModule,

    PostDataDomainModule,
  ],
  controllers: [LikeController, LikeByUserController, LikeByPostDataController],
  providers: [],
})
export class LikeApplicationModule {}
