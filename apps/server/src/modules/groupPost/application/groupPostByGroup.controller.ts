import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupPostDomainFacade } from '@server/modules/groupPost/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupPostApplicationEvent } from './groupPost.application.event'
import { GroupPostCreateDto } from './groupPost.dto'

import { GroupDomainFacade } from '../../group/domain'

@Controller('/v1/groups')
export class GroupPostByGroupController {
  constructor(
    private groupDomainFacade: GroupDomainFacade,

    private groupPostDomainFacade: GroupPostDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/groupPosts')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.groupPostDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/groupPosts')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: GroupPostCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

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
