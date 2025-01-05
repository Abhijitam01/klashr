import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class GroupPostApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPosts${buildOptions}`);
    }
    static findOne(groupPostId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPosts/${groupPostId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/groupPosts`, values);
    }
    static updateOne(groupPostId, values) {
        return HttpService.api.patch(`/v1/groupPosts/${groupPostId}`, values);
    }
    static deleteOne(groupPostId) {
        return HttpService.api.delete(`/v1/groupPosts/${groupPostId}`);
    }
    static findManyByGroupId(groupId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groups/group/${groupId}/groupPosts${buildOptions}`);
    }
    static createOneByGroupId(groupId, values) {
        return HttpService.api.post(`/v1/groups/group/${groupId}/groupPosts`, values);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/groupPosts${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/groupPosts`, values);
    }
}
