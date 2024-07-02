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
  GroupPostLike,
  GroupPostLikeDomainFacade,
} from '@server/modules/groupPostLike/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { GroupPostLikeApplicationEvent } from './groupPostLike.application.event'
import {
  GroupPostLikeCreateDto,
  GroupPostLikeUpdateDto,
} from './groupPostLike.dto'

@Controller('/v1/groupPostLikes')
export class GroupPostLikeController {
  constructor(
    private eventService: EventService,
    private groupPostLikeDomainFacade: GroupPostLikeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.groupPostLikeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: GroupPostLikeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.groupPostLikeDomainFacade.create(body)

    await this.eventService.emit<GroupPostLikeApplicationEvent.GroupPostLikeCreated.Payload>(
      GroupPostLikeApplicationEvent.GroupPostLikeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:groupPostLikeId')
  async findOne(
    @Param('groupPostLikeId') groupPostLikeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.groupPostLikeDomainFacade.findOneByIdOrFail(
      groupPostLikeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:groupPostLikeId')
  async update(
    @Param('groupPostLikeId') groupPostLikeId: string,
    @Body() body: GroupPostLikeUpdateDto,
  ) {
    const item =
      await this.groupPostLikeDomainFacade.findOneByIdOrFail(groupPostLikeId)

    const itemUpdated = await this.groupPostLikeDomainFacade.update(
      item,
      body as Partial<GroupPostLike>,
    )
    return itemUpdated
  }

  @Delete('/:groupPostLikeId')
  async delete(@Param('groupPostLikeId') groupPostLikeId: string) {
    const item =
      await this.groupPostLikeDomainFacade.findOneByIdOrFail(groupPostLikeId)

    await this.groupPostLikeDomainFacade.delete(item)

    return item
  }
}
