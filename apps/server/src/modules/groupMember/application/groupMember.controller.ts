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
  GroupMember,
  GroupMemberDomainFacade,
} from '@server/modules/groupMember/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GroupMemberApplicationEvent } from './groupMember.application.event'
import { GroupMemberCreateDto, GroupMemberUpdateDto } from './groupMember.dto'

@Controller('/v1/groupMembers')
export class GroupMemberController {
  constructor(
    private eventService: EventService,
    private groupMemberDomainFacade: GroupMemberDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.groupMemberDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GroupMemberCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.groupMemberDomainFacade.create(body)

    await this.eventService.emit<GroupMemberApplicationEvent.GroupMemberCreated.Payload>(
      GroupMemberApplicationEvent.GroupMemberCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:groupMemberId')
  async findOne(
    @Param('groupMemberId') groupMemberId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.groupMemberDomainFacade.findOneByIdOrFail(
      groupMemberId,
      queryOptions,
    )

    return item
  }

  @Patch('/:groupMemberId')
  async update(
    @Param('groupMemberId') groupMemberId: string,
    @Body() body: GroupMemberUpdateDto,
  ) {
    const item =
      await this.groupMemberDomainFacade.findOneByIdOrFail(groupMemberId)

    const itemUpdated = await this.groupMemberDomainFacade.update(
      item,
      body as Partial<GroupMember>,
    )
    return itemUpdated
  }

  @Delete('/:groupMemberId')
  async delete(@Param('groupMemberId') groupMemberId: string) {
    const item =
      await this.groupMemberDomainFacade.findOneByIdOrFail(groupMemberId)

    await this.groupMemberDomainFacade.delete(item)

    return item
  }
}
