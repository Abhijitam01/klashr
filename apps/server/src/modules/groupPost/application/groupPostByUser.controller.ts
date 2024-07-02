import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostDomainFacade } from '@server/modules/groupPost/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostApplicationEvent } from './groupPost.application.event'
import { GroupPostCreateDto } from './groupPost.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class GroupPostByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private groupPostDomainFacade: GroupPostDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/groupPosts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.groupPostDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/groupPosts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: GroupPostCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.groupPostDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GroupPostApplicationEvent.GroupPostCreated.Payload>(
      GroupPostApplicationEvent.GroupPostCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
