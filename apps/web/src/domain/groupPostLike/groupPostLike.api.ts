import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupPostLike } from './groupPostLike.model'

export class GroupPostLikeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupPostLike>,
  ): Promise<GroupPostLike[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupPostLikes${buildOptions}`)
  }

  static findOne(
    groupPostLikeId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostLike>,
  ): Promise<GroupPostLike> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupPostLikes/${groupPostLikeId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<GroupPostLike>): Promise<GroupPostLike> {
    return HttpService.api.post(`/v1/groupPostLikes`, values)
  }

  static updateOne(
    groupPostLikeId: string,
    values: Partial<GroupPostLike>,
  ): Promise<GroupPostLike> {
    return HttpService.api.patch(
      `/v1/groupPostLikes/${groupPostLikeId}`,
      values,
    )
  }

  static deleteOne(groupPostLikeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupPostLikes/${groupPostLikeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostLike>,
  ): Promise<GroupPostLike[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupPostLikes${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupPostLike>,
  ): Promise<GroupPostLike> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/groupPostLikes`,
      values,
    )
  }

  static findManyByGroupPostId(
    groupPostId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostLike>,
  ): Promise<GroupPostLike[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupPosts/groupPost/${groupPostId}/groupPostLikes${buildOptions}`,
    )
  }

  static createOneByGroupPostId(
    groupPostId: string,
    values: Partial<GroupPostLike>,
  ): Promise<GroupPostLike> {
    return HttpService.api.post(
      `/v1/groupPosts/groupPost/${groupPostId}/groupPostLikes`,
      values,
    )
  }
}
