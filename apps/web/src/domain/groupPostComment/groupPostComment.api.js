import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class GroupPostCommentApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPostComments${buildOptions}`);
    }
    static findOne(groupPostCommentId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPostComments/${groupPostCommentId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/groupPostComments`, values);
    }
    static updateOne(groupPostCommentId, values) {
        return HttpService.api.patch(`/v1/groupPostComments/${groupPostCommentId}`, values);
    }
    static deleteOne(groupPostCommentId) {
        return HttpService.api.delete(`/v1/groupPostComments/${groupPostCommentId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/groupPostComments${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/groupPostComments`, values);
    }
    static findManyByGroupPostId(groupPostId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPosts/groupPost/${groupPostId}/groupPostComments${buildOptions}`);
    }
    static createOneByGroupPostId(groupPostId, values) {
        return HttpService.api.post(`/v1/groupPosts/groupPost/${groupPostId}/groupPostComments`, values);
    }
}
