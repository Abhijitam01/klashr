import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LikeDomainFacade } from '@server/modules/like/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LikeApplicationEvent } from './like.application.event'
import { LikeCreateDto } from './like.dto'

import { PostDataDomainFacade } from '../../postData/domain'

@Controller('/v1/postDatas')
export class LikeByPostDataController {
  constructor(
    private postDataDomainFacade: PostDataDomainFacade,

    private likeDomainFacade: LikeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/post/:postId/likes')
  async findManyPostId(
    @Param('postId') postId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.postDataDomainFacade.findOneByIdOrFail(postId)

    const items = await this.likeDomainFacade.findManyByPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/post/:postId/likes')
  async createByPostId(
    @Param('postId') postId: string,
    @Body() body: LikeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, postId }

    const item = await this.likeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LikeApplicationEvent.LikeCreated.Payload>(
      LikeApplicationEvent.LikeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
