import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DirectMessage } from './directMessage.model'

export class DirectMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DirectMessage>,
  ): Promise<DirectMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/directMessages${buildOptions}`)
  }

  static findOne(
    directMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<DirectMessage>,
  ): Promise<DirectMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/directMessages/${directMessageId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<DirectMessage>): Promise<DirectMessage> {
    return HttpService.api.post(`/v1/directMessages`, values)
  }

  static updateOne(
    directMessageId: string,
    values: Partial<DirectMessage>,
  ): Promise<DirectMessage> {
    return HttpService.api.patch(
      `/v1/directMessages/${directMessageId}`,
      values,
    )
  }

  static deleteOne(directMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/directMessages/${directMessageId}`)
  }

  static findManyBySenderId(
    senderId: string,
    queryOptions?: ApiHelper.QueryOptions<DirectMessage>,
  ): Promise<DirectMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/sender/${senderId}/directMessages${buildOptions}`,
    )
  }

  static createOneBySenderId(
    senderId: string,
    values: Partial<DirectMessage>,
  ): Promise<DirectMessage> {
    return HttpService.api.post(
      `/v1/users/sender/${senderId}/directMessages`,
      values,
    )
  }

  static findManyByReceiverId(
    receiverId: string,
    queryOptions?: ApiHelper.QueryOptions<DirectMessage>,
  ): Promise<DirectMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/receiver/${receiverId}/directMessages${buildOptions}`,
    )
  }

  static createOneByReceiverId(
    receiverId: string,
    values: Partial<DirectMessage>,
  ): Promise<DirectMessage> {
    return HttpService.api.post(
      `/v1/users/receiver/${receiverId}/directMessages`,
      values,
    )
  }
}
