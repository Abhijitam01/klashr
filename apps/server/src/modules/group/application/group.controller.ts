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
import { Group, GroupDomainFacade } from '@server/modules/group/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GroupApplicationEvent } from './group.application.event'
import { GroupCreateDto, GroupUpdateDto } from './group.dto'

@Controller('/v1/groups')
export class GroupController {
  constructor(
    private eventService: EventService,
    private groupDomainFacade: GroupDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.groupDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GroupCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.groupDomainFacade.create(body)

    await this.eventService.emit<GroupApplicationEvent.GroupCreated.Payload>(
      GroupApplicationEvent.GroupCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:groupId')
  async findOne(@Param('groupId') groupId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.groupDomainFacade.findOneByIdOrFail(
      groupId,
      queryOptions,
    )

    return item
  }

  @Patch('/:groupId')
  async update(
    @Param('groupId') groupId: string,
    @Body() body: GroupUpdateDto,
  ) {
    const item = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const itemUpdated = await this.groupDomainFacade.update(
      item,
      body as Partial<Group>,
    )
    return itemUpdated
  }

  @Delete('/:groupId')
  async delete(@Param('groupId') groupId: string) {
    const item = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    await this.groupDomainFacade.delete(item)

    return item
  }
}
