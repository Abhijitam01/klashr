import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DirectMessageDomainFacade } from '@server/modules/directMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DirectMessageApplicationEvent } from './directMessage.application.event'
import { DirectMessageCreateDto } from './directMessage.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DirectMessageByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private directMessageDomainFacade: DirectMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sender/:senderId/directMessages')
  async findManySenderId(
    @Param('senderId') senderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(senderId)

    const items = await this.directMessageDomainFacade.findManyBySender(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sender/:senderId/directMessages')
  async createBySenderId(
    @Param('senderId') senderId: string,
    @Body() body: DirectMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, senderId }

    const item = await this.directMessageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DirectMessageApplicationEvent.DirectMessageCreated.Payload>(
      DirectMessageApplicationEvent.DirectMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/receiver/:receiverId/directMessages')
  async findManyReceiverId(
    @Param('receiverId') receiverId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(receiverId)

    const items = await this.directMessageDomainFacade.findManyByReceiver(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/receiver/:receiverId/directMessages')
  async createByReceiverId(
    @Param('receiverId') receiverId: string,
    @Body() body: DirectMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, receiverId }

    const item = await this.directMessageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DirectMessageApplicationEvent.DirectMessageCreated.Payload>(
      DirectMessageApplicationEvent.DirectMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
