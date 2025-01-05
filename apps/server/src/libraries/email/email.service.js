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
import { ConfigurationService } from "../../core/configuration";
import { LoggerService } from '../logger';
import { EmailType } from './internal/email.type';
import { MailjetProvider } from './internal/providers/mailjet/mailjet.provider';
import { NodemailerProvider } from './internal/providers/nodemailer/nodemailer.provider';
let EmailService = class EmailService {
    loggerService;
    configurationService;
    nodemailerProvider;
    mailjetProvider;
    logger;
    provider;
    Type = EmailType;
    constructor(loggerService, configurationService, nodemailerProvider, mailjetProvider) {
        this.loggerService = loggerService;
        this.configurationService = configurationService;
        this.nodemailerProvider = nodemailerProvider;
        this.mailjetProvider = mailjetProvider;
        this.logger = this.loggerService.create({ name: 'EmailService' });
        const isProduction = this.configurationService.isEnvironmentProduction();
        if (isProduction) {
            this.provider = this.mailjetProvider;
        }
        else {
            this.provider = this.nodemailerProvider;
        }
    }
    async send(options) {
        return this.provider
            .send({
            type: options.type,
            content: options.content,
            to: [
                {
                    name: options.name,
                    email: options.email,
                },
            ],
            variables: options.variables,
            subject: options.subject,
        })
            .then(() => {
            this.logger.log(`Email sent to ${options.email}`, options);
        });
    }
};
EmailService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        ConfigurationService,
        NodemailerProvider,
        MailjetProvider])
], EmailService);
export { EmailService };
