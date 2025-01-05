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
import { Body, Controller, Post } from '@nestjs/common';
import { DateHelper } from "../../../helpers/date";
import { FileHelper } from "../../../helpers/file";
import { HttpService } from "../../../libraries/http";
import { OpenaiService } from "../../../libraries/openai";
import { UploadService } from "../../../libraries/upload";
import { AIApplicationException } from './ai.application.exception';
import { AiChatBody, AiFromAudioToTextBody, AiFromTextToAudioBody, AiGenerateImageBody, } from './ai.dto';
let AiController = class AiController {
    openaiService;
    exception;
    httpService;
    uploadService;
    constructor(openaiService, exception, httpService, uploadService) {
        this.openaiService = openaiService;
        this.exception = exception;
        this.httpService = httpService;
        this.uploadService = uploadService;
    }
    async chat(body) {
        const { prompt } = body;
        if (!this.openaiService.isActive()) {
            this.exception.openaiNotActivated();
        }
        try {
            const answer = await this.openaiService.chat(prompt);
            return { answer };
        }
        catch (error) {
            this.exception.openaiError(error);
        }
    }
    async generateImage(body) {
        const { prompt } = body;
        if (!this.openaiService.isActive()) {
            this.exception.openaiNotActivated();
        }
        try {
            const answer = await this.openaiService.generateImage(prompt);
            return { answer };
        }
        catch (error) {
            this.exception.openaiError(error);
        }
    }
    async fromAudioToText(body) {
        const { url } = body;
        if (!this.openaiService.isActive()) {
            this.exception.openaiNotActivated();
        }
        try {
            const arrayBuffer = await this.httpService.download(url);
            const readstream = await FileHelper.createReadStreamFromArrayBuffer(arrayBuffer, 'audio.wav');
            const answer = await this.openaiService.fromAudioToText(readstream);
            return { answer };
        }
        catch (error) {
            this.exception.openaiError(error);
        }
    }
    async fromTextToAudio(body) {
        const { text } = body;
        if (!this.openaiService.isActive()) {
            this.exception.openaiNotActivated();
        }
        try {
            const buffer = await this.openaiService.fromTextToAudio(text);
            const now = DateHelper.getNow();
            const filename = `${now.getTime()}.mp3`;
            const file = {
                originalname: filename,
                buffer: buffer,
            };
            const urls = await this.uploadService.uploadPublic(file);
            return { url: urls[0].url };
        }
        catch (error) {
            this.exception.openaiError(error);
        }
    }
};
__decorate([
    Post('/chat'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiChatBody]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    Post('/image'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiGenerateImageBody]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateImage", null);
__decorate([
    Post('/audio-to-text'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiFromAudioToTextBody]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "fromAudioToText", null);
__decorate([
    Post('/text-to-audio'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiFromTextToAudioBody]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "fromTextToAudio", null);
AiController = __decorate([
    Controller('/v1/ai'),
    __metadata("design:paramtypes", [OpenaiService,
        AIApplicationException,
        HttpService,
        UploadService])
], AiController);
export { AiController };
