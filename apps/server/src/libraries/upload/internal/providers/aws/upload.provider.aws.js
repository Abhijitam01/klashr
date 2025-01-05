var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UploadProviderAws_1;
import { GetObjectCommand, ListBucketsCommand, PutObjectCommand, S3Client, } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigurationService } from "../../../../../core/configuration";
import { DateHelper } from "../../../../../helpers/date";
import { Utility } from "../../../../../helpers/utility";
import { HttpService } from "../../../../http";
import { UploadProvider, } from "../../../upload.provider";
import { LoggerService } from '../../../../logger';
const ONE_HOUR_IN_SECONDS = 60 * 60;
let UploadProviderAws = class UploadProviderAws extends UploadProvider {
    static { UploadProviderAws_1 = this; }
    loggerService;
    configurationService;
    httpService;
    static isMarblismInitialised = false;
    logger;
    client;
    bucketNamePublic;
    bucketNamePrivate;
    region;
    credentials;
    marblismApiKey;
    bucketKey;
    constructor(loggerService, configurationService, httpService) {
        super();
        this.loggerService = loggerService;
        this.configurationService = configurationService;
        this.httpService = httpService;
        this.logger = this.loggerService.create({ name: 'UploadProviderAws' });
    }
    async initialise() {
        this.region = this.configurationService.get(`SERVER_UPLOAD_AWS_REGION`, 'us-west-1');
        try {
            this.marblismApiKey = this.configurationService.get(`SERVER_UPLOAD_MARBLISM_API_KEY`);
            if (Utility.isDefined(this.marblismApiKey)) {
                if (UploadProviderAws_1.isMarblismInitialised) {
                    return;
                }
                await this.initializeWithMarblism();
                this.logger.success(`AWS library (Marblism) active in region ${this.region}`);
                UploadProviderAws_1.isMarblismInitialised = true;
                return;
            }
        }
        catch (error) {
            this.logger.warning(`AWS library (Marblism) failed to start`);
        }
        try {
            const accessKey = this.configurationService.get(`SERVER_UPLOAD_AWS_ACCESS_KEY`);
            const secretKey = this.configurationService.get(`SERVER_UPLOAD_AWS_SECRET_KEY`);
            if (!accessKey && !secretKey) {
                throw new Error('Set SERVER_UPLOAD_AWS_ACCESS_KEY && SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate');
            }
            if (!accessKey) {
                throw new Error('Set SERVER_UPLOAD_AWS_ACCESS_KEY in your .env to activate');
            }
            if (!secretKey) {
                throw new Error('Set SERVER_UPLOAD_AWS_SECRET_KEY in your .env to activate');
            }
            this.bucketNamePublic = this.configurationService.get(`SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME`);
            if (!this.bucketNamePublic) {
                this.logger.warning(`Set SERVER_UPLOAD_AWS_BUCKET_PUBLIC_NAME in your .env to activate a public bucket with infinite urls`);
            }
            this.bucketNamePrivate = this.configurationService.get(`SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME`);
            if (!this.bucketNamePrivate) {
                this.logger.warning(`Set SERVER_UPLOAD_AWS_BUCKET_PRIVATE_NAME in your .env to activate a private bucket with signed urls`);
            }
            this.client = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: accessKey,
                    secretAccessKey: secretKey,
                },
            });
            await this.check();
            this.logger.success(`AWS library active in region ${this.region}`);
        }
        catch (error) {
            this.logger.warning(`AWS library failed to start`);
            throw new Error(error);
        }
    }
    async initializeWithMarblism() {
        const dashboardBaseUrl = this.configurationService.getDashboardBaseUrl();
        const url = `${dashboardBaseUrl}/v1/addons/upload/create-credentials`;
        this.httpService.setApiKey(this.marblismApiKey);
        const response = await this.httpService.post(url, {});
        this.bucketNamePrivate = response.bucketNamePrivate;
        this.bucketNamePublic = `${response.bucketNamePublic}`;
        this.credentials = {
            accessKeyId: response.accessKeyId,
            secretAccessKey: response.secretAccessKey,
            sessionToken: response.sessionToken,
            expiration: new Date(response.expiration),
        };
        this.bucketKey = response.bucketKey;
        this.client = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.credentials.accessKeyId,
                secretAccessKey: this.credentials.secretAccessKey,
                sessionToken: this.credentials.sessionToken,
            },
        });
        await this.check();
    }
    async ensureCredentials() {
        if (!UploadProviderAws_1.isMarblismInitialised) {
            return;
        }
        if (this.areCredentialsValid()) {
            return;
        }
        const dashboardBaseUrl = this.configurationService.getDashboardBaseUrl();
        const url = `${dashboardBaseUrl}/v1/addons/upload/refresh-credentials`;
        this.httpService.setApiKey(this.marblismApiKey);
        const response = await this.httpService.post(url, {});
        this.credentials = {
            accessKeyId: response.accessKeyId,
            secretAccessKey: response.secretAccessKey,
            sessionToken: response.sessionToken,
            expiration: new Date(response.expiration),
        };
        this.client = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: this.credentials.accessKeyId,
                secretAccessKey: this.credentials.secretAccessKey,
                sessionToken: this.credentials.sessionToken,
            },
        });
        await this.check();
    }
    areCredentialsValid() {
        const isTokenDefined = Utility.isDefined(this.credentials);
        const isTokenValid = isTokenDefined &&
            DateHelper.isBefore(DateHelper.getNow(), this.credentials.expiration);
        return isTokenValid;
    }
    async check() {
        const buckets = await this.listBuckets();
        if (this.bucketNamePrivate) {
            this.logger.log(`Checking bucket "${this.bucketNamePrivate}"...`);
            const bucket = buckets.find(bucket => bucket.name === this.bucketNamePrivate);
            if (bucket) {
                this.logger.success(`Bucket "${this.bucketNamePrivate}" is active`);
            }
            else {
                throw new Error(`Bucket "${this.bucketNamePrivate}" was not found`);
            }
        }
        if (this.bucketNamePublic) {
            this.logger.log(`Checking bucket "${this.bucketNamePublic}"...`);
            const bucket = buckets.find(bucket => bucket.name === this.bucketNamePublic);
            if (bucket) {
                this.logger.success(`Bucket "${this.bucketNamePublic}" is active`);
            }
            else {
                throw new Error(`Bucket "${this.bucketNamePublic}" was not found`);
            }
        }
    }
    async uploadPublic(options) {
        await this.ensureCredentials();
        const { file } = options;
        let key = this.ensureFilename(file.originalname);
        key = this.ensureKey(key);
        const command = new PutObjectCommand({
            Bucket: `${this.bucketNamePublic}`,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        try {
            await this.client.send(command);
            this.logger.success(`File ${file.originalname} saved (public)`);
            const url = `${this.getBaseUrlPublic()}/${key}`;
            return { url };
        }
        catch (error) {
            this.logger.error(`${error}`);
            throw new Error(`Could not upload public file with key "${key}"`);
        }
    }
    async uploadPrivate(options) {
        await this.ensureCredentials();
        const { file } = options;
        const key = this.ensureFilename(file.originalname);
        const command = new PutObjectCommand({
            Bucket: `${this.bucketNamePrivate}`,
            Key: this.ensureKey(key),
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        try {
            await this.client.send(command);
            this.logger.success(`File ${file.originalname} saved (private)`);
            const url = `${this.getBaseUrlPrivate()}/${key}`;
            return { url };
        }
        catch (error) {
            this.logger.error(`${error}`);
            throw new Error(`Could not upload private file with key "${key}"`);
        }
    }
    async fromPrivateToPublicUrl({ url, expiresInSeconds = ONE_HOUR_IN_SECONDS, }) {
        if (!this.isUrlPrivate(url)) {
            throw new Error(`${url} must be a private url`);
        }
        await this.ensureCredentials();
        const key = this.extractKeyFromUrlPrivate(url);
        const params = {
            Bucket: `${this.bucketNamePrivate}`,
            Key: this.ensureKey(key),
        };
        const command = new GetObjectCommand(params);
        const urlPublic = await getSignedUrl(this.client, command, {
            expiresIn: expiresInSeconds,
        });
        return { url: urlPublic };
    }
    /* -------------------------------------------------------------------------- */
    /*                                   PRIVATE                                  */
    /* -------------------------------------------------------------------------- */
    async listBuckets() {
        const result = await this.client.send(new ListBucketsCommand({}));
        const buckets = result.Buckets.map(item => ({
            name: item.Name,
            dateCreation: item.CreationDate,
        }));
        return buckets;
    }
    getBaseUrlPrivate() {
        return `https://${this.bucketNamePrivate}.s3.${this.region}.amazonaws.com`;
    }
    getBaseUrlPublic() {
        return `https://${this.bucketNamePublic}.s3.${this.region}.amazonaws.com`;
    }
    ensureKey(key) {
        let keyClean = key;
        const isPrefixedSlash = keyClean.startsWith('/');
        if (isPrefixedSlash) {
            keyClean = keyClean.slice(1);
        }
        const isPrefixedBucketKey = keyClean.startsWith(this.bucketKey);
        if (!isPrefixedBucketKey) {
            keyClean = `${this.bucketKey}/${keyClean}`;
        }
        return keyClean;
    }
    isUrlPrivate(url) {
        const baseUrlPrivate = this.getBaseUrlPrivate();
        const isPrivate = url.startsWith(baseUrlPrivate);
        return isPrivate;
    }
    extractKeyFromUrlPrivate(url) {
        const baseUrlPrivate = this.getBaseUrlPrivate();
        return url.replace(baseUrlPrivate, '');
    }
};
UploadProviderAws = UploadProviderAws_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        ConfigurationService,
        HttpService])
], UploadProviderAws);
export { UploadProviderAws };
