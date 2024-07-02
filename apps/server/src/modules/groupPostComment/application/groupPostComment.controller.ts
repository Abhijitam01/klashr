import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  GroupPostComment,
  GroupPostCommentDomainFacade,
} from '@server/modules/groupPostComment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GroupPostCommentApplicationEvent } from './groupPostComment.application.event'
import {
  GroupPostCommentCreateDto,
  GroupPostCommentUpdateDto,
} from './groupPostComment.dto'

@Controller('/v1/groupPostComments')
export class GroupPostCommentController {
  constructor(
    private eventService: EventService,
    private groupPostCommentDomainFacade: GroupPostCommentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.groupPostCommentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: GroupPostCommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.groupPostCommentDomainFacade.create(body)

    await this.eventService.emit<GroupPostCommentApplicationEvent.GroupPostCommentCreated.Payload>(
      GroupPostCommentApplicationEvent.GroupPostCommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:groupPostCommentId')
  async findOne(
    @Param('groupPostCommentId') groupPostCommentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.groupPostCommentDomainFacade.findOneByIdOrFail(
      groupPostCommentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:groupPostCommentId')
  async update(
    @Param('groupPostCommentId') groupPostCommentId: string,
    @Body() body: GroupPostCommentUpdateDto,
  ) {
    const item =
      await this.groupPostCommentDomainFacade.findOneByIdOrFail(
        groupPostCommentId,
      )

    const itemUpdated = await this.groupPostCommentDomainFacade.update(
      item,
      body as Partial<GroupPostComment>,
    )
    return itemUpdated
  }

  @Delete('/:groupPostCommentId')
  async delete(@Param('groupPostCommentId') groupPostCommentId: string) {
    const item =
      await this.groupPostCommentDomainFacade.findOneByIdOrFail(
        groupPostCommentId,
      )

    await this.groupPostCommentDomainFacade.delete(item)

    return item
  }
}
