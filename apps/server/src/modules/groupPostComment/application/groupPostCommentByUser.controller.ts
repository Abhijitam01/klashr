import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostCommentDomainFacade } from '@server/modules/groupPostComment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostCommentApplicationEvent } from './groupPostComment.application.event'
import { GroupPostCommentCreateDto } from './groupPostComment.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class GroupPostCommentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private groupPostCommentDomainFacade: GroupPostCommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/groupPostComments')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.groupPostCommentDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/groupPostComments')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: GroupPostCommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.groupPostCommentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GroupPostCommentApplicationEvent.GroupPostCommentCreated.Payload>(
      GroupPostCommentApplicationEvent.GroupPostCommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
