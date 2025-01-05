import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class CommentApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/comments${buildOptions}`);
    }
    static findOne(commentId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/comments/${commentId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/comments`, values);
    }
    static updateOne(commentId, values) {
        return HttpService.api.patch(`/v1/comments/${commentId}`, values);
    }
    static deleteOne(commentId) {
        return HttpService.api.delete(`/v1/comments/${commentId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/comments${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/comments`, values);
    }
    static findManyByPostId(postId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/postDatas/post/${postId}/comments${buildOptions}`);
    }
    static createOneByPostId(postId, values) {
        return HttpService.api.post(`/v1/postDatas/post/${postId}/comments`, values);
    }
}
