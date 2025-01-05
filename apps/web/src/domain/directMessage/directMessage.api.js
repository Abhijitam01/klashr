import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class DirectMessageApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/directMessages${buildOptions}`);
    }
    static findOne(directMessageId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/directMessages/${directMessageId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/directMessages`, values);
    }
    static updateOne(directMessageId, values) {
        return HttpService.api.patch(`/v1/directMessages/${directMessageId}`, values);
    }
    static deleteOne(directMessageId) {
        return HttpService.api.delete(`/v1/directMessages/${directMessageId}`);
    }
    static findManyBySenderId(senderId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/sender/${senderId}/directMessages${buildOptions}`);
    }
    static createOneBySenderId(senderId, values) {
        return HttpService.api.post(`/v1/users/sender/${senderId}/directMessages`, values);
    }
    static findManyByReceiverId(receiverId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/receiver/${receiverId}/directMessages${buildOptions}`);
    }
    static createOneByReceiverId(receiverId, values) {
        return HttpService.api.post(`/v1/users/receiver/${receiverId}/directMessages`, values);
    }
}
