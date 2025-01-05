var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigurationService, ConfigurationServiceObject, } from "../../../core/configuration";
import { CookieService } from "../../../core/cookie";
import { RequestHelper } from "../../../helpers/request";
import * as Jwt from 'jsonwebtoken';
const TIME_24_HOURS = 60 * 60 * 24;
let AuthenticationDomainFacade = class AuthenticationDomainFacade {
    configurationService;
    cookieService;
    constructor(configurationService, cookieService) {
        this.configurationService = configurationService;
        this.cookieService = cookieService;
    }
    /* ---------------------------------- TOKEN --------------------------------- */
    buildToken(userId, expiresInSeconds = TIME_24_HOURS) {
        const payload = { userId };
        const secret = this.getSecret();
        const token = Jwt.sign(payload, secret, { expiresIn: expiresInSeconds });
        return token;
    }
    getAccessToken(request) {
        if (this.configurationService.getAuthenticationTokenMethod() ===
            ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES) {
            return this.cookieService.getAccessToken(request);
        }
        else {
            return RequestHelper.getAuthorization(request);
        }
    }
    setAccessToken(response, token) {
        if (this.configurationService.getAuthenticationTokenMethod() ===
            ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES) {
            this.cookieService.setAccessToken(response, token);
            return {};
        }
        return { token };
    }
    buildTokenResetPassword(user) {
        const payload = { userId: user.id };
        const secret = this.getSecret();
        const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS });
        return token;
    }
    verifyTokenOrFail(token) {
        const isError = typeof token !== 'string';
        if (isError) {
            throw new Error('Token must be defined');
        }
        const secret = this.getSecret();
        const payload = Jwt.verify(token, secret);
        return payload;
    }
    async verifyTokenResetPasswordOrFail(token) {
        const isError = typeof token !== 'string';
        if (isError) {
            throw new Error('Token must be defined');
        }
        const secret = this.getSecret();
        const payload = Jwt.verify(token, secret);
        return payload;
    }
    assignRequestPayload(request, payload) {
        const store = { ...(request['store'] ?? {}) };
        store.authentication = {
            ...(store.authentication ?? {}),
            user: {
                id: payload.user.id,
                name: payload.user.name,
                email: payload.user.email,
            },
        };
        request['store'] = store;
    }
    getRequestPayload(request) {
        return request['store']?.authentication ?? {};
    }
    getSecret() {
        return this.configurationService.get('SERVER_AUTHENTICATION_SECRET');
    }
};
AuthenticationDomainFacade = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService,
        CookieService])
], AuthenticationDomainFacade);
export { AuthenticationDomainFacade };
