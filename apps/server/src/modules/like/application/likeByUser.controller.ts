import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LikeDomainFacade } from '@server/modules/like/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LikeApplicationEvent } from './like.application.event'
import { LikeCreateDto } from './like.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class LikeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private likeDomainFacade: LikeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/likes')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.likeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/likes')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: LikeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
