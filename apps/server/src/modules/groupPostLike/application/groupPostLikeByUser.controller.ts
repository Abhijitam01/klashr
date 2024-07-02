import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostLikeDomainFacade } from '@server/modules/groupPostLike/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostLikeApplicationEvent } from './groupPostLike.application.event'
import { GroupPostLikeCreateDto } from './groupPostLike.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class GroupPostLikeByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private groupPostLikeDomainFacade: GroupPostLikeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/groupPostLikes')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.groupPostLikeDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/groupPostLikes')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: GroupPostLikeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.groupPostLikeDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GroupPostLikeApplicationEvent.GroupPostLikeCreated.Payload>(
      GroupPostLikeApplicationEvent.GroupPostLikeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
