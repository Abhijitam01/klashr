import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { GroupPost } from './groupPost.model'

import { Group } from '../../group/domain'

import { User } from '../../user/domain'

@Injectable()
export class GroupPostDomainFacade {
  constructor(
    @InjectRepository(GroupPost)
    private repository: Repository<GroupPost>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<GroupPost>): Promise<GroupPost> {
    return this.repository.save(values)
  }

  async update(
    item: GroupPost,
    values: Partial<GroupPost>,
  ): Promise<GroupPost> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: GroupPost): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<GroupPost> = {},
  ): Promise<GroupPost[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<GroupPost> = {},
  ): Promise<GroupPost> {
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

  async findManyByGroup(
    item: Group,
    queryOptions: RequestHelper.QueryOptions<GroupPost> = {},
  ): Promise<GroupPost[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('group')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        groupId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<GroupPost> = {},
  ): Promise<GroupPost[]> {
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
}
