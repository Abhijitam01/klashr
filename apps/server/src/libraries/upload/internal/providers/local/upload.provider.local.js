var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UploadProviderLocal_1;
import { Injectable } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigurationService } from "../../../../../core/configuration";
import { FileHelper } from "../../../../../helpers/file";
import { UploadProvider, } from "../../../upload.provider";
import { join } from 'path';
import { LoggerService } from '../../../../logger';
let UploadProviderLocal = class UploadProviderLocal extends UploadProvider {
    static { UploadProviderLocal_1 = this; }
    loggerService;
    configurationService;
    static path = '/api-static';
    static setup() {
        return ServeStaticModule.forRoot({
            rootPath: join(FileHelper.getRoot(), `.${this.path}`),
            serveRoot: this.path,
        });
    }
    logger;
    staticServerUrl;
    pathPublic = `.${UploadProviderLocal_1.path}/public`;
    pathPrivate = `.${UploadProviderLocal_1.path}/private`;
    constructor(loggerService, configurationService) {
        super();
        this.loggerService = loggerService;
        this.configurationService = configurationService;
        this.logger = this.loggerService.create({ name: 'UploadProviderLocal' });
    }
    initialise() {
        try {
            FileHelper.writeFolder(this.pathPublic);
            this.staticServerUrl = `${this.configurationService.getBaseUrl()}`;
            this.logger.success(`Upload Local is active`);
        }
        catch (error) {
            this.logger.error(`Upload Local failed to start: ${error.message}`);
        }
        return;
    }
    async uploadPublic({ file, }) {
        const content = file.buffer;
        const filename = this.ensureFilename(file.originalname);
        const path = FileHelper.joinPaths(this.pathPublic, filename);
        FileHelper.writeFile(path, content);
        const url = `${this.staticServerUrl}/${path}`;
        return { url };
    }
    async uploadPrivate({ file, }) {
        const content = file.buffer;
        const filename = this.ensureFilename(file.originalname);
        const path = FileHelper.joinPaths(this.pathPrivate, filename);
        FileHelper.writeFile(path, content);
        const url = `${this.staticServerUrl}/${path}`;
        return { url };
    }
    async fromPrivateToPublicUrl({ url, }) {
        return { url };
    }
};
UploadProviderLocal = UploadProviderLocal_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        ConfigurationService])
], UploadProviderLocal);
export { UploadProviderLocal };
