var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@nestjs/common';
import { ContextHelper } from "../../helpers/context";
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
let LoggingInterceptor = class LoggingInterceptor {
    loggingService;
    constructor(loggingService) {
        this.loggingService = loggingService;
    }
    intercept(context, next) {
        const request = ContextHelper.toRequest(context);
        this.loggingService.logOnStart(request);
        return next.handle().pipe(tap(() => {
            this.loggingService.logOnStop(request);
        }));
    }
};
LoggingInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggingService])
], LoggingInterceptor);
export { LoggingInterceptor };
