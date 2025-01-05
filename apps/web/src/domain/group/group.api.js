import { HttpService } from '../../core/http';
import { ApiHelper } from '../helpers/api.helper';
export class GroupApi {
    static findMany(queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groups${buildOptions}`);
    }
    static findOne(groupId, queryOptions) {
        const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
        return HttpService.api.get(`/v1/groups/${groupId}${buildOptions}`);
    }
    static createOne(values) {
        return HttpService.api.post(`/v1/groups`, values);
    }
    static updateOne(groupId, values) {
        return HttpService.api.patch(`/v1/groups/${groupId}`, values);
    }
    static deleteOne(groupId) {
        return HttpService.api.delete(`/v1/groups/${groupId}`);
    }
}
