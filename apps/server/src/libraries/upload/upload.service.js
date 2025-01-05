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
import { ConfigurationService } from "../../core/configuration";
import { HttpService } from '../http';
import { LoggerService } from '../logger';
import { UploadProviderAws } from './internal/providers/aws/upload.provider.aws';
import { UploadProviderLocal } from './internal/providers/local/upload.provider.local';
let UploadService = class UploadService {
    configurationService;
    loggerService;
    httpService;
    logger;
    instance;
    constructor(configurationService, loggerService, httpService) {
        this.configurationService = configurationService;
        this.loggerService = loggerService;
        this.httpService = httpService;
        this.logger = loggerService.create({ name: 'UploadService' });
    }
    async onModuleInit() {
        this.instance = await this.createInstance();
    }
    async createInstance() {
        try {
            this.logger.log(`Trying using AWS...`);
            const instance = new UploadProviderAws(this.loggerService, this.configurationService, this.httpService);
            await instance.initialise();
            return instance;
        }
        catch (error) {
            this.logger.warning(`Could not use AWS: ${error.message}`);
        }
        this.logger.log(`Falling back on local provider (not recommended for production)`);
        try {
            const instance = new UploadProviderLocal(this.loggerService, this.configurationService);
            await instance.initialise();
            return instance;
        }
        catch (error) {
            this.logger.warning(`Could not use local provider: ${error.message}`);
        }
    }
    async uploadPublic(...files) {
        const responses = [];
        for (const file of files) {
            const response = await this.instance.uploadPublic({ file });
            responses.push(response);
        }
        return responses;
    }
    async uploadPrivate(...files) {
        const responses = [];
        for (const file of files) {
            const response = await this.instance.uploadPrivate({ file });
            responses.push(response);
        }
        return responses;
    }
    async fromPrivateToPublicUrl(...items) {
        const responses = [];
        for (const item of items) {
            const response = await this.instance.fromPrivateToPublicUrl(item);
            responses.push(response);
        }
        return responses;
    }
};
UploadService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService,
        LoggerService,
        HttpService])
], UploadService);
export { UploadService };
