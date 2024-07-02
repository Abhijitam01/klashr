import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupMemberDomainFacade } from '@server/modules/groupMember/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupMemberApplicationEvent } from './groupMember.application.event'
import { GroupMemberCreateDto } from './groupMember.dto'

import { GroupDomainFacade } from '../../group/domain'

@Controller('/v1/groups')
export class GroupMemberByGroupController {
  constructor(
    private groupDomainFacade: GroupDomainFacade,

    private groupMemberDomainFacade: GroupMemberDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/groupMembers')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.groupMemberDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/groupMembers')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: GroupMemberCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

    const item = await this.groupMemberDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GroupMemberApplicationEvent.GroupMemberCreated.Payload>(
      GroupMemberApplicationEvent.GroupMemberCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
