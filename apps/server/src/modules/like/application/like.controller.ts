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
import { Like, LikeDomainFacade } from '@server/modules/like/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { LikeApplicationEvent } from './like.application.event'
import { LikeCreateDto, LikeUpdateDto } from './like.dto'

@Controller('/v1/likes')
export class LikeController {
  constructor(
    private eventService: EventService,
    private likeDomainFacade: LikeDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.likeDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: LikeCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.likeDomainFacade.create(body)

    await this.eventService.emit<LikeApplicationEvent.LikeCreated.Payload>(
      LikeApplicationEvent.LikeCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:likeId')
  async findOne(@Param('likeId') likeId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.likeDomainFacade.findOneByIdOrFail(
      likeId,
      queryOptions,
    )

    return item
  }

  @Patch('/:likeId')
  async update(@Param('likeId') likeId: string, @Body() body: LikeUpdateDto) {
    const item = await this.likeDomainFacade.findOneByIdOrFail(likeId)

    const itemUpdated = await this.likeDomainFacade.update(
      item,
      body as Partial<Like>,
    )
    return itemUpdated
  }

  @Delete('/:likeId')
  async delete(@Param('likeId') likeId: string) {
    const item = await this.likeDomainFacade.findOneByIdOrFail(likeId)

    await this.likeDomainFacade.delete(item)

    return item
  }
}
