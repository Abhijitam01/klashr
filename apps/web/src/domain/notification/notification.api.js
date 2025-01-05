import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class NotificationApi {
    static findManyByMe(queryOptions = {}) {
        const options = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/me/notifications${options}`);
    }
    static deleteOneByMe(notificationId) {
        return HttpService.api.delete(`/v1/users/me/notifications/${notificationId}`);
    }
    static deleteAllByMe() {
        return HttpService.api.delete(`/v1/users/me/notifications`);
    }
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/notifications${buildOptions}`);
    }
    static findOne(notificationId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/notifications/${notificationId}${buildOptions}`);
    }
    static createOne(notification) {
        return HttpService.api.post(`/v1/notifications`, notification);
    }
    static updateOne(notificationId, values) {
        return HttpService.api.patch(`/v1/notifications/${notificationId}`, values);
    }
    static deleteOne(notificationId) {
        return HttpService.api.delete(`/v1/notifications/${notificationId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/notifications${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/notifications`, values);
    }
}
