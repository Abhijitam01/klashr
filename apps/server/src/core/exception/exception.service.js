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
import { LoggerService } from "../../libraries/logger";
import { Exception } from './exception';
let ExceptionService = class ExceptionService {
    loggerService;
    logger;
    constructor(loggerService) {
        this.loggerService = loggerService;
        this.logger = this.loggerService.create({ name: 'ExceptionService' });
    }
    throw(payload) {
        const message = payload.privateMessage ?? payload.publicMessage;
        this.logger.log(`[ErrorCode | ${payload.code}] ${message}`, payload);
        throw new Exception({
            code: payload.code,
            message: payload.publicMessage,
            status: payload.status,
        });
    }
    isCustom(exception) {
        try {
            const payload = exception.getResponse();
            return payload?.type === 'CORE_EXCEPTION';
        }
        catch (error) {
            return false;
        }
    }
    getPayload(exception) {
        const payload = exception.getResponse();
        return payload;
    }
};
ExceptionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService])
], ExceptionService);
export { ExceptionService };
