import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class UserApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users${buildOptions}`);
    }
    static findOne(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/${userId}${buildOptions}`);
    }
    static findMe(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/me${buildOptions}`);
    }
    static createOne(user) {
        return HttpService.api.post(`/v1/users`, user);
    }
    static updateOne(userId, values) {
        return HttpService.api.patch(`/v1/users/${userId}`, values);
    }
    static deleteOne(userId) {
        return HttpService.api.delete(`/v1/users/${userId}`);
    }
}
