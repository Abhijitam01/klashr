var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Catch, HttpException, } from '@nestjs/common';
import { ExceptionService } from './exception.service';
let ExceptionFilter = class ExceptionFilter {
    exceptionService;
    constructor(exceptionService) {
        this.exceptionService = exceptionService;
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const status = exception.getStatus();
        if (this.exceptionService.isCustom(exception)) {
            const payload = this.exceptionService.getPayload(exception);
            response.status(status).json({
                code: payload.code,
                message: payload.message,
            });
        }
        else {
            const payload = exception.getResponse();
            const message = exception.message;
            const data = payload?.message;
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message,
                data,
            });
        }
    }
};
ExceptionFilter = __decorate([
    Catch(HttpException),
    __metadata("design:paramtypes", [ExceptionService])
], ExceptionFilter);
export { ExceptionFilter };
