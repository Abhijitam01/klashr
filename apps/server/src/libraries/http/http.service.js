var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpService as HttpServiceAxios } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
let HttpService = class HttpService {
    httpService;
    options = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };
    constructor(httpService) {
        this.httpService = httpService;
    }
    async post(url, body) {
        const response = await firstValueFrom(this.httpService.post(url, body, this.options).pipe(catchError((error) => {
            throw error;
        })));
        return response.data;
    }
    async download(url) {
        const response = await firstValueFrom(this.httpService
            .get(url, { responseType: 'arraybuffer' })
            .pipe(catchError((error) => {
            throw error;
        })));
        return response.data;
    }
    setApiKey(apiKey) {
        this.options.headers['Authorization'] = apiKey;
        this.options['credentials'] = 'include';
    }
};
HttpService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpServiceAxios])
], HttpService);
export { HttpService };
