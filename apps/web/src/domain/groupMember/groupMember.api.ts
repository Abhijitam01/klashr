import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { GroupMember } from './groupMember.model'

export class GroupMemberApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<GroupMember>,
  ): Promise<GroupMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/groupMembers${buildOptions}`)
  }

  static findOne(
    groupMemberId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupMember>,
  ): Promise<GroupMember> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groupMembers/${groupMemberId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<GroupMember>): Promise<GroupMember> {
    return HttpService.api.post(`/v1/groupMembers`, values)
  }

  static updateOne(
    groupMemberId: string,
    values: Partial<GroupMember>,
  ): Promise<GroupMember> {
    return HttpService.api.patch(`/v1/groupMembers/${groupMemberId}`, values)
  }

  static deleteOne(groupMemberId: string): Promise<void> {
    return HttpService.api.delete(`/v1/groupMembers/${groupMemberId}`)
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupMember>,
  ): Promise<GroupMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groups/group/${groupId}/groupMembers${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<GroupMember>,
  ): Promise<GroupMember> {
    return HttpService.api.post(
      `/v1/groups/group/${groupId}/groupMembers`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<GroupMember>,
  ): Promise<GroupMember[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/groupMembers${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<GroupMember>,
  ): Promise<GroupMember> {
    return HttpService.api.post(`/v1/users/user/${userId}/groupMembers`, values)
  }
}
