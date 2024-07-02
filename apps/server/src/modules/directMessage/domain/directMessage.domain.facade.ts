import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DirectMessage } from './directMessage.model'

import { User } from '../../user/domain'

@Injectable()
export class DirectMessageDomainFacade {
  constructor(
    @InjectRepository(DirectMessage)
    private repository: Repository<DirectMessage>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<DirectMessage>): Promise<DirectMessage> {
    return this.repository.save(values)
  }

  async update(
    item: DirectMessage,
    values: Partial<DirectMessage>,
  ): Promise<DirectMessage> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DirectMessage): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DirectMessage> = {},
  ): Promise<DirectMessage[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DirectMessage> = {},
  ): Promise<DirectMessage> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyBySender(
    item: User,
    queryOptions: RequestHelper.QueryOptions<DirectMessage> = {},
  ): Promise<DirectMessage[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('sender')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        senderId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByReceiver(
    item: User,
    queryOptions: RequestHelper.QueryOptions<DirectMessage> = {},
  ): Promise<DirectMessage[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('receiver')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        receiverId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
