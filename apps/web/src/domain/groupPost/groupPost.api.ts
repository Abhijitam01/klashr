import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupPost } from './groupPost.model'

export class GroupPostApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupPost>,
  ): Promise<GroupPost[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupPosts${buildOptions}`)
  }

  static findOne(
    groupPostId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPost>,
  ): Promise<GroupPost> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupPosts/${groupPostId}${buildOptions}`)
  }

  static createOne(values: Partial<GroupPost>): Promise<GroupPost> {
    return HttpService.api.post(`/v1/groupPosts`, values)
  }

  static updateOne(
    groupPostId: string,
    values: Partial<GroupPost>,
  ): Promise<GroupPost> {
    return HttpService.api.patch(`/v1/groupPosts/${groupPostId}`, values)
  }

  static deleteOne(groupPostId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupPosts/${groupPostId}`)
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPost>,
  ): Promise<GroupPost[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groups/group/${groupId}/groupPosts${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<GroupPost>,
  ): Promise<GroupPost> {
    return HttpService.api.post(
      `/v1/groups/group/${groupId}/groupPosts`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPost>,
  ): Promise<GroupPost[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupPosts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupPost>,
  ): Promise<GroupPost> {
    return HttpService.api.post(`/v1/users/user/${userId}/groupPosts`, values)
  }
}
