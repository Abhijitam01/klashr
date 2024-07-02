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
  DirectMessage,
  DirectMessageDomainFacade,
} from '@server/modules/directMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DirectMessageApplicationEvent } from './directMessage.application.event'
import {
  DirectMessageCreateDto,
  DirectMessageUpdateDto,
} from './directMessage.dto'

@Controller('/v1/directMessages')
export class DirectMessageController {
  constructor(
    private eventService: EventService,
    private directMessageDomainFacade: DirectMessageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.directMessageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DirectMessageCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.directMessageDomainFacade.create(body)

    await this.eventService.emit<DirectMessageApplicationEvent.DirectMessageCreated.Payload>(
      DirectMessageApplicationEvent.DirectMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:directMessageId')
  async findOne(
    @Param('directMessageId') directMessageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.directMessageDomainFacade.findOneByIdOrFail(
      directMessageId,
      queryOptions,
    )

    return item
  }

  @Patch('/:directMessageId')
  async update(
    @Param('directMessageId') directMessageId: string,
    @Body() body: DirectMessageUpdateDto,
  ) {
    const item =
      await this.directMessageDomainFacade.findOneByIdOrFail(directMessageId)

    const itemUpdated = await this.directMessageDomainFacade.update(
      item,
      body as Partial<DirectMessage>,
    )
    return itemUpdated
  }

  @Delete('/:directMessageId')
  async delete(@Param('directMessageId') directMessageId: string) {
    const item =
      await this.directMessageDomainFacade.findOneByIdOrFail(directMessageId)

    await this.directMessageDomainFacade.delete(item)

    return item
  }
}
