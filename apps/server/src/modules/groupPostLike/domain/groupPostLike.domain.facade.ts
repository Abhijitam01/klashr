import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { GroupPostLike } from './groupPostLike.model'

import { User } from '../../user/domain'

import { GroupPost } from '../../groupPost/domain'

@Injectable()
export class GroupPostLikeDomainFacade {
  constructor(
    @InjectRepository(GroupPostLike)
    private repository: Repository<GroupPostLike>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<GroupPostLike>): Promise<GroupPostLike> {
    return this.repository.save(values)
  }

  async update(
    item: GroupPostLike,
    values: Partial<GroupPostLike>,
  ): Promise<GroupPostLike> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: GroupPostLike): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<GroupPostLike> = {},
  ): Promise<GroupPostLike[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<GroupPostLike> = {},
  ): Promise<GroupPostLike> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<GroupPostLike> = {},
  ): Promise<GroupPostLike[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByGroupPost(
    item: GroupPost,
    queryOptions: RequestHelper.QueryOptions<GroupPostLike> = {},
  ): Promise<GroupPostLike[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('groupPost')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        groupPostId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
