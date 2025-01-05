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
import * as NodemailerSDK from 'nodemailer';
import { ConfigurationService } from '../../../../../core/configuration';
import { LoggerService } from '../../../../logger';
import { EmailSender } from '../../email.type';
import { EmailTemplateService } from '../../templates/email.template.service';
let NodemailerProvider = class NodemailerProvider {
    loggerService;
    configurationService;
    templateService;
    logger;
    client;
    constructor(loggerService, configurationService, templateService) {
        this.loggerService = loggerService;
        this.configurationService = configurationService;
        this.templateService = templateService;
        this.logger = this.loggerService.create({ name: 'NodemailerProvider' });
        this.initialise();
    }
    initialise() {
        try {
            const host = this.configurationService.get('SERVER_EMAIL_MAILPIT_HOST') ??
                'localhost';
            const port = this.configurationService.getNumber('SERVER_EMAIL_MAILPIT_PORT', 1022);
            this.client = NodemailerSDK.createTransport({
                host,
                port,
            });
            this.logger.success(`Nodemailer is active (${host}:${port})`);
        }
        catch (error) {
            this.logger.error(`Nodemailer failed to start: ${error.message}`);
        }
    }
    async send(options) {
        const from = EmailSender.default;
        const content = this.templateService.get(options);
        for (const to of options.to) {
            await this.client
                .sendMail({
                from: `${from.name} <${from.email}>`,
                to: to.email,
                subject: options.subject,
                html: content,
            })
                .then(result => {
                this.logger.log(`Emails sent`);
            })
                .catch(error => {
                this.logger.error(`Could not send emails (${error.statusCode})`);
                this.logger.error(error);
            });
        }
    }
};
NodemailerProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        ConfigurationService,
        EmailTemplateService])
], NodemailerProvider);
export { NodemailerProvider };
