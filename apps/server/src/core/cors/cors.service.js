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
import { ConfigurationService, ConfigurationServiceObject, } from '../configuration';
let CorsService = class CorsService {
    configurationService;
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    getOptions() {
        const clientBaseUrl = this.configurationService.getClientBaseUrl();
        const clientBaseUrlAppSlug = this.configurationService.getClientBaseUrlAppSlug();
        const options = {
            [ConfigurationServiceObject.Environment.DEVELOPMENT]: {
                origin: [clientBaseUrl],
                credentials: true,
            },
            [ConfigurationServiceObject.Environment.PRODUCTION]: {
                origin: [clientBaseUrl, clientBaseUrlAppSlug],
                credentials: true,
            },
        };
        const environment = this.configurationService.getEnvironment();
        const value = options[environment];
        const valueDefault = options[ConfigurationServiceObject.Environment.DEVELOPMENT];
        return value ?? valueDefault;
    }
};
CorsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService])
], CorsService);
export { CorsService };
