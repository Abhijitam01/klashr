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
import { WinstonService } from './internal/winston.service';
import { Logger } from './logger';
let LoggerService = class LoggerService {
    winstonService;
    instance;
    constructor(winstonService) {
        this.winstonService = winstonService;
        this.instance = this.winstonService.create();
    }
    create(options) {
        return new Logger({ ...options, instance: this.instance });
    }
    log(message, data) {
        this.instance.info(message, { data });
    }
    success(message) {
        this.instance.info(`[SUCCESS] ${message}`);
    }
    error(error) {
        if (typeof error === 'string') {
            this.instance.error(error);
        }
        else {
            this.instance.error(error.message);
        }
    }
};
LoggerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WinstonService])
], LoggerService);
export { LoggerService };
