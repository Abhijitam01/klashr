var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from "../../../libraries/upload";
import { UploadFromPrivateToPublicDto } from './upload.dto';
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadPublic(file) {
        const responses = await this.uploadService.uploadPublic(file);
        const url = responses[0].url;
        return { url };
    }
    async uploadPrivate(file) {
        const responses = await this.uploadService.uploadPrivate(file);
        const url = responses[0].url;
        return { url };
    }
    async fromPrivateToPubic(body) {
        const responses = await this.uploadService.fromPrivateToPublicUrl(body);
        const url = responses[0].url;
        return { url };
    }
};
__decorate([
    Post('/public'),
    UseInterceptors(FileInterceptor('file')),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadPublic", null);
__decorate([
    Post('/private'),
    UseInterceptors(FileInterceptor('file')),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadPrivate", null);
__decorate([
    Post('/private-to-public'),
    UseInterceptors(FileInterceptor('file')),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UploadFromPrivateToPublicDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "fromPrivateToPubic", null);
UploadController = __decorate([
    Controller('/v1/upload'),
    __metadata("design:paramtypes", [UploadService])
], UploadController);
export { UploadController };
