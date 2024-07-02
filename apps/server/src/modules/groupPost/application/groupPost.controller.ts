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
  GroupPost,
  GroupPostDomainFacade,
} from '@server/modules/groupPost/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GroupPostApplicationEvent } from './groupPost.application.event'
import { GroupPostCreateDto, GroupPostUpdateDto } from './groupPost.dto'

@Controller('/v1/groupPosts')
export class GroupPostController {
  constructor(
    private eventService: EventService,
    private groupPostDomainFacade: GroupPostDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.groupPostDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GroupPostCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.groupPostDomainFacade.create(body)

    await this.eventService.emit<GroupPostApplicationEvent.GroupPostCreated.Payload>(
      GroupPostApplicationEvent.GroupPostCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:groupPostId')
  async findOne(
    @Param('groupPostId') groupPostId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.groupPostDomainFacade.findOneByIdOrFail(
      groupPostId,
      queryOptions,
    )

    return item
  }

  @Patch('/:groupPostId')
  async update(
    @Param('groupPostId') groupPostId: string,
    @Body() body: GroupPostUpdateDto,
  ) {
    const item = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId)

    const itemUpdated = await this.groupPostDomainFacade.update(
      item,
      body as Partial<GroupPost>,
    )
    return itemUpdated
  }

  @Delete('/:groupPostId')
  async delete(@Param('groupPostId') groupPostId: string) {
    const item = await this.groupPostDomainFacade.findOneByIdOrFail(groupPostId)

    await this.groupPostDomainFacade.delete(item)

    return item
  }
}
