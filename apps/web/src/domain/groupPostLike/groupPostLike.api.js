import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class GroupPostLikeApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPostLikes${buildOptions}`);
    }
    static findOne(groupPostLikeId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPostLikes/${groupPostLikeId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/groupPostLikes`, values);
    }
    static updateOne(groupPostLikeId, values) {
        return HttpService.api.patch(`/v1/groupPostLikes/${groupPostLikeId}`, values);
    }
    static deleteOne(groupPostLikeId) {
        return HttpService.api.delete(`/v1/groupPostLikes/${groupPostLikeId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/groupPostLikes${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/groupPostLikes`, values);
    }
    static findManyByGroupPostId(groupPostId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groupPosts/groupPost/${groupPostId}/groupPostLikes${buildOptions}`);
    }
    static createOneByGroupPostId(groupPostId, values) {
        return HttpService.api.post(`/v1/groupPosts/groupPost/${groupPostId}/groupPostLikes`, values);
    }
}
