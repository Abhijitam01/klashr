import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class PostDataApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/postDatas${buildOptions}`);
    }
    static findOne(postDataId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/postDatas/${postDataId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/postDatas`, values);
    }
    static updateOne(postDataId, values) {
        return HttpService.api.patch(`/v1/postDatas/${postDataId}`, values);
    }
    static deleteOne(postDataId) {
        return HttpService.api.delete(`/v1/postDatas/${postDataId}`);
    }
    static findManyByUserId(userId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/users/user/${userId}/postDatas${buildOptions}`);
    }
    static createOneByUserId(userId, values) {
        return HttpService.api.post(`/v1/users/user/${userId}/postDatas`, values);
    }
}
