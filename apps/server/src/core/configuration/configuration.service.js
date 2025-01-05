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
import { ConfigService } from '@nestjs/config';
import { Utility } from "../../helpers/utility";
import { ConfigurationServiceObject } from './configuration.service.object';
let ConfigurationService = class ConfigurationService {
    manager;
    constructor(manager) {
        this.manager = manager;
    }
    get(key, valueDefault) {
        let value = this.manager.get(key);
        if (!Utility.isDefined(value)) {
            value = valueDefault;
        }
        return value;
    }
    getPort() {
        let value = this.manager.get(ConfigurationServiceObject.Key.PORT);
        if (!Utility.isDefined(value)) {
            value = 3099;
        }
        return value;
    }
    getNumber(key, valueDefault) {
        let value = this.manager.get(key);
        if (!Utility.isDefined(value)) {
            value = valueDefault;
        }
        return value;
    }
    getBoolean(key, valueDefault) {
        let value = this.manager.get(key);
        if (!Utility.isDefined(value)) {
            value = valueDefault;
        }
        return value;
    }
    getEnvironment() {
        const value = this.get(ConfigurationServiceObject.Key.ENVIRONMENT, ConfigurationServiceObject.Environment.DEVELOPMENT);
        return value;
    }
    getAuthenticationTokenMethod() {
        const value = this.manager.get(ConfigurationServiceObject.Key.AUTHENTICATION_TOKEN_METHOD, ConfigurationServiceObject.AuthenticationTokenMethod.COOKIES);
        return value;
    }
    getClientBaseUrl() {
        const value = this.manager.get(ConfigurationServiceObject.Key.CLIENT_BASE_URL);
        const valueClean = Utility.removeTrailingSlash(value);
        return valueClean;
    }
    getClientBaseUrlAppSlug() {
        const value = this.manager.get(ConfigurationServiceObject.Key.SERVER_CLIENT_BASE_URL_APP_SLUG);
        return value;
    }
    getBaseUrl() {
        const port = this.getPort();
        let value = this.manager.get(ConfigurationServiceObject.Key.BASE_URL);
        if (!Utility.isDefined(value)) {
            value = `http://localhost:${port}`;
        }
        const valueClean = Utility.removeTrailingSlash(value);
        return valueClean;
    }
    getDashboardBaseUrl() {
        const valueDefault = `http://localhost:3001/api`;
        const valueProduction = `https://api.marblism.com/api`;
        if (this.isEnvironmentProduction()) {
            return valueProduction;
        }
        return valueDefault;
    }
    isEnvironmentDevelopment() {
        return (this.getEnvironment() ===
            ConfigurationServiceObject.Environment.DEVELOPMENT);
    }
    isEnvironmentProduction() {
        return (this.getEnvironment() ===
            ConfigurationServiceObject.Environment.PRODUCTION);
    }
};
ConfigurationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], ConfigurationService);
export { ConfigurationService };
