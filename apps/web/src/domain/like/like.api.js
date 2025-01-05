import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class LikeApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/likes${buildOptions}`);
    }
    static findOne(likeId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/likes/${likeId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/likes`, values);
    }
    static updateOne(likeId, values) {
        return HttpService.api.patch(`/v1/likes/${likeId}`, values);
    }
    static deleteOne(likeId) {
        return HttpService.api.delete(`/v1/likes/${likeId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/likes${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/likes`, values);
    }
    static findManyByPostId(postId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/postDatas/post/${postId}/likes${buildOptions}`);
    }
    static createOneByPostId(postId, values) {
        return HttpService.api.post(`/v1/postDatas/post/${postId}/likes`, values);
    }
}
