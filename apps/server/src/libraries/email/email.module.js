var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailjetProvider } from './internal/providers/mailjet/mailjet.provider';
import { NodemailerProvider } from './internal/providers/nodemailer/nodemailer.provider';
import { EmailTemplateService } from './internal/templates/email.template.service';
let EmailModule = class EmailModule {
};
EmailModule = __decorate([
    Module({
        imports: [],
        providers: [
            EmailService,
            NodemailerProvider,
            MailjetProvider,
            EmailTemplateService,
        ],
        exports: [EmailService],
    })
], EmailModule);
export { EmailModule };
