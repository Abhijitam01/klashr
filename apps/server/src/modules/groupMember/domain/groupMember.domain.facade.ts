import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { GroupMember } from './groupMember.model'

import { Group } from '../../group/domain'

import { User } from '../../user/domain'

@Injectable()
export class GroupMemberDomainFacade {
  constructor(
    @InjectRepository(GroupMember)
    private repository: Repository<GroupMember>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<GroupMember>): Promise<GroupMember> {
    return this.repository.save(values)
  }

  async update(
    item: GroupMember,
    values: Partial<GroupMember>,
  ): Promise<GroupMember> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: GroupMember): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<GroupMember> = {},
  ): Promise<GroupMember[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<GroupMember> = {},
  ): Promise<GroupMember> {
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
    queryOptions: RequestHelper.QueryOptions<GroupMember> = {},
  ): Promise<GroupMember[]> {
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
    queryOptions: RequestHelper.QueryOptions<GroupMember> = {},
  ): Promise<GroupMember[]> {
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
