import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Like } from './like.model'

export class LikeApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Like>,
  ): Promise<Like[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/likes${buildOptions}`)
  }

  static findOne(
    likeId: string,
    queryOptions?: ApiHelper.QueryOptions<Like>,
  ): Promise<Like> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/likes/${likeId}${buildOptions}`)
  }

  static createOne(values: Partial<Like>): Promise<Like> {
    return HttpService.api.post(`/v1/likes`, values)
  }

  static updateOne(likeId: string, values: Partial<Like>): Promise<Like> {
    return HttpService.api.patch(`/v1/likes/${likeId}`, values)
  }

  static deleteOne(likeId: string): Promise<void> {
    return HttpService.api.delete(`/v1/likes/${likeId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Like>,
  ): Promise<Like[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/users/user/${userId}/likes${buildOptions}`)
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Like>,
  ): Promise<Like> {
    return HttpService.api.post(`/v1/users/user/${userId}/likes`, values)
  }

  static findManyByPostId(
    postId: string,
    queryOptions?: ApiHelper.QueryOptions<Like>,
  ): Promise<Like[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/postDatas/post/${postId}/likes${buildOptions}`,
    )
  }

  static createOneByPostId(
    postId: string,
    values: Partial<Like>,
  ): Promise<Like> {
    return HttpService.api.post(`/v1/postDatas/post/${postId}/likes`, values)
  }
}
