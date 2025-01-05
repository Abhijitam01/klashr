import { HttpService } from '../../core/http';
export class AuthenticationApi {
    static login(values) {
        return HttpService.api.post(`/v1/authentication/login`, values);
    }
    static register(values) {
        return HttpService.api.post(`/v1/authentication/register`, values);
    }
    static registerVisitor() {
        return HttpService.api.post(`/v1/authentication/register-visitor`);
    }
    static refresh() {
        return HttpService.api.post(`/v1/authentication/refresh`);
    }
    static logout(document) {
        return HttpService.api
            .post(`/v1/authentication/logout`)
            .catch(() => { })
            .then(() => {
            document.cookie =
                'APP_ACCESS_TOKEN= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        });
    }
    static sendResetPassword(email) {
        return HttpService.api.post(`/v1/authentication/reset-password-email`, {
            email,
        });
    }
    static resetPassword(token, password) {
        return HttpService.api.patch(`/v1/authentication/reset-password`, {
            token,
            password,
        });
    }
    static googleCallback(values) {
        return HttpService.api.post(`/v1/authentication/google/callback`, {
            token: values.credential,
        });
    }
}
