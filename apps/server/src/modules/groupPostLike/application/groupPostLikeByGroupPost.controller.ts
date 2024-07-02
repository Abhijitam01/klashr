import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostLikeDomainFacade } from '@server/modules/groupPostLike/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostLikeApplicationEvent } from './groupPostLike.application.event'
import { GroupPostLikeCreateDto } from './groupPostLike.dto'

import { GroupPostDomainFacade } from '../../groupPost/domain'

@Controller('/v1/groupPosts')
export class GroupPostLikeByGroupPostController {
  constructor(
    private groupPostDomainFacade: GroupPostDomainFacade,

    private groupPostLikeDomainFacade: GroupPostLikeDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/groupPost/:groupPostId/groupPostLikes')
  async findManyGroupPostId(
    @Param('groupPostId') groupPostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId)

    const items = await this.groupPostLikeDomainFacade.findManyByGroupPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/groupPost/:groupPostId/groupPostLikes')
  async createByGroupPostId(
    @Param('groupPostId') groupPostId: string,
    @Body() body: GroupPostLikeCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupPostId }

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
