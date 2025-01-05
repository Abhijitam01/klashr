var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpStatus, Injectable } from '@nestjs/common';
import { ExceptionService } from "../../../core/exception";
let AIApplicationException = class AIApplicationException {
    service;
    constructor(service) {
        this.service = service;
    }
    openaiNotActivated() {
        return this.service.throw({
            status: HttpStatus.SERVICE_UNAVAILABLE,
            code: 0,
            publicMessage: 'Set OPENAI_API_KEY in your .env to activate OpenAI',
            privateMessage: `Set OPENAI_API_KEY in your .env to activate OpenAI`,
        });
    }
    openaiError(error) {
        return this.service.throw({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: 1,
            publicMessage: 'Something unexpected happened.',
            privateMessage: error?.message,
            cause: error,
        });
    }
};
AIApplicationException = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ExceptionService])
], AIApplicationException);
export { AIApplicationException };
