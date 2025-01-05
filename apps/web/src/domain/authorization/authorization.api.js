import { HttpService } from '../../core/http';
export class AuthorizationApi {
    static sendCode(type, email) {
        return HttpService.api.post(`/v1/authorization/${type}/code`, { email });
    }
    static verifyCode(type, email, values) {
        const body = { ...values, email };
        return HttpService.api.post(`/v1/authorization/${type}/code-verification`, body);
    }
    static getPermissions() {
        return HttpService.api.get(`/v1/users/me/authorization/permissions`);
    }
}
