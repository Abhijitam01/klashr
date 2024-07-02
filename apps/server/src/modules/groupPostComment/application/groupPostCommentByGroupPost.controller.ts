import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostCommentDomainFacade } from '@server/modules/groupPostComment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostCommentApplicationEvent } from './groupPostComment.application.event'
import { GroupPostCommentCreateDto } from './groupPostComment.dto'

import { GroupPostDomainFacade } from '../../groupPost/domain'

@Controller('/v1/groupPosts')
export class GroupPostCommentByGroupPostController {
  constructor(
    private groupPostDomainFacade: GroupPostDomainFacade,

    private groupPostCommentDomainFacade: GroupPostCommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/groupPost/:groupPostId/groupPostComments')
  async findManyGroupPostId(
    @Param('groupPostId') groupPostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId)

    const items = await this.groupPostCommentDomainFacade.findManyByGroupPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/groupPost/:groupPostId/groupPostComments')
  async createByGroupPostId(
    @Param('groupPostId') groupPostId: string,
    @Body() body: GroupPostCommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupPostId }

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
