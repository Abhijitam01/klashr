import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Group } from './group.model'

export class GroupApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Group>,
  ): Promise<Group[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groups${buildOptions}`)
  }

  static findOne(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<Group>,
  ): Promise<Group> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groups/${groupId}${buildOptions}`)
  }

  static createOne(values: Partial<Group>): Promise<Group> {
    return HttpService.api.post(`/v1/groups`, values)
  }

  static updateOne(groupId: string, values: Partial<Group>): Promise<Group> {
    return HttpService.api.patch(`/v1/groups/${groupId}`, values)
  }

  static deleteOne(groupId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groups/${groupId}`)
  }
}
