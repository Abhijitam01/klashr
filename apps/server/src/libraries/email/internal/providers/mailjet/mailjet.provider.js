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
import { ConfigurationService } from "../../../../../core/configuration";
import { LoggerService } from "../../../../logger";
import Mailjet from 'node-mailjet';
import { EmailSender, EmailType } from '../../email.type';
import { EmailTemplateService } from '../../templates/email.template.service';
let MailjetProvider = class MailjetProvider {
    configurationService;
    loggerService;
    templateService;
    logger;
    client;
    templateIds = {
        [EmailType.DEFAULT]: null,
        [EmailType.AUTHENTICATION_WELCOME]: null,
        [EmailType.AUTHENTICATION_FORGOT_PASSWORD]: null,
        [EmailType.AUTHORIZATION_VERIFICATION_CODE]: null,
    };
    constructor(configurationService, loggerService, templateService) {
        this.configurationService = configurationService;
        this.loggerService = loggerService;
        this.templateService = templateService;
        this.logger = this.loggerService.create({ name: 'MailjetProvider' });
        this.initialise();
    }
    initialise() {
        const isProduction = this.configurationService.isEnvironmentProduction();
        if (!isProduction) {
            this.logger.warning(`Mailjet is disabled in development`);
            return;
        }
        try {
            const apiKey = this.configurationService.get('SERVER_EMAIL_MAILJET_API_KEY');
            const secretKey = this.configurationService.get('SERVER_EMAIL_MAILJET_SECRET_KEY');
            if (!apiKey || !secretKey) {
                this.logger.warning(`Set EMAIL_MAILJET_API_KEY and EMAIL_MAILJET_SECRET_KEY to activate Mailjet`);
                return;
            }
            this.client = new Mailjet({ apiKey, apiSecret: secretKey });
            this.logger.success(`Mailjet service active`);
        }
        catch (error) {
            this.logger.error(`Could not start Mailjet service`);
            this.logger.error(error);
        }
    }
    async send(options) {
        const message = this.buildMessage(options);
        return this.client
            .post('send', { version: 'v3.1' })
            .request({
            Messages: [
                {
                    ...message,
                },
            ],
        })
            .then(result => {
            this.logger.log(`Emails sent`, result);
        })
            .catch(error => {
            this.logger.error(`Could not send emails (${error.statusCode})`);
        });
    }
    buildMessage(options) {
        const from = {
            Email: EmailSender.default.email,
            Name: EmailSender.default.name,
        };
        const to = options.to.map(item => ({ Email: item.email, Name: item.name }));
        const message = {
            From: from,
            To: to,
            Subject: options.subject,
            HTMLPart: undefined,
            Variables: undefined,
            TemplateLanguage: undefined,
            templateId: undefined,
        };
        const templateId = this.templateIds[options.type];
        if (templateId) {
            message.TemplateLanguage = true;
            message.templateId = templateId;
            message.Variables = options.variables;
        }
        else {
            const content = this.templateService.get(options);
            message.HTMLPart = content;
        }
        return message;
    }
};
MailjetProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService,
        LoggerService,
        EmailTemplateService])
], MailjetProvider);
export { MailjetProvider };
