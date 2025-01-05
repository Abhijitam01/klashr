var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './exception.filter';
import { ExceptionService } from './exception.service';
let ExceptionModule = class ExceptionModule {
    static getFilters() {
        return [
            {
                provide: APP_FILTER,
                useClass: ExceptionFilter,
            },
        ];
    }
};
ExceptionModule = __decorate([
    Global(),
    Module({
        providers: [ExceptionService],
        exports: [ExceptionService],
    })
], ExceptionModule);
export { ExceptionModule };
