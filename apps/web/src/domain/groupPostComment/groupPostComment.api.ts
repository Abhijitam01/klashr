import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupPostComment } from './groupPostComment.model'

export class GroupPostCommentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupPostComment>,
  ): Promise<GroupPostComment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupPostComments${buildOptions}`)
  }

  static findOne(
    groupPostCommentId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostComment>,
  ): Promise<GroupPostComment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupPostComments/${groupPostCommentId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<GroupPostComment>,
  ): Promise<GroupPostComment> {
    return HttpService.api.post(`/v1/groupPostComments`, values)
  }

  static updateOne(
    groupPostCommentId: string,
    values: Partial<GroupPostComment>,
  ): Promise<GroupPostComment> {
    return HttpService.api.patch(
      `/v1/groupPostComments/${groupPostCommentId}`,
      values,
    )
  }

  static deleteOne(groupPostCommentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupPostComments/${groupPostCommentId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostComment>,
  ): Promise<GroupPostComment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupPostComments${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupPostComment>,
  ): Promise<GroupPostComment> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/groupPostComments`,
      values,
    )
  }

  static findManyByGroupPostId(
    groupPostId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupPostComment>,
  ): Promise<GroupPostComment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupPosts/groupPost/${groupPostId}/groupPostComments${buildOptions}`,
    )
  }

  static createOneByGroupPostId(
    groupPostId: string,
    values: Partial<GroupPostComment>,
  ): Promise<GroupPostComment> {
    return HttpService.api.post(
      `/v1/groupPosts/groupPost/${groupPostId}/groupPostComments`,
      values,
    )
  }
}
