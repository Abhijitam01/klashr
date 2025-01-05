import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class GroupMemberApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupMembers${buildOptions}`);
    }
    static findOne(groupMemberId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupMembers/${groupMemberId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/groupMembers`, values);
    }
    static updateOne(groupMemberId, values) {
        return HttpService.api.patch(`/v1/groupMembers/${groupMemberId}`, values);
    }
    static deleteOne(groupMemberId) {
        return HttpService.api.delete(`/v1/groupMembers/${groupMemberId}`);
    }
    static findManyByGroupId(groupId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groups/group/${groupId}/groupMembers${buildOptions}`);
    }
    static createOneByGroupId(groupId, values) {
        return HttpService.api.post(`/v1/groups/group/${groupId}/groupMembers`, values);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/groupMembers${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/groupMembers`, values);
    }
}
