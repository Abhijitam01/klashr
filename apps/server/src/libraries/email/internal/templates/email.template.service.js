var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { FileHelper } from "../../../../helpers/file";
import { EmailType } from '../email.type';
import { Components } from './components';
let EmailTemplateService = class EmailTemplateService {
    pathTemplates = `${FileHelper.getRoot()}/src/libraries/email/internal/templates`;
    mapping = {
        [EmailType.AUTHORIZATION_VERIFICATION_CODE]: 'authorization-verification-code',
        [EmailType.AUTHENTICATION_WELCOME]: 'authentication-welcome',
        [EmailType.AUTHENTICATION_FORGOT_PASSWORD]: 'authentication-forgot-password',
        [EmailType.DEFAULT]: 'default',
    };
    get(options) {
        const values = options.variables ?? { content: options.content };
        const pathBase = this.getPathBase();
        const pathCSS = this.getPathCSS();
        const pathTemplate = this.getPathTemplate(options.type);
        const contentBase = FileHelper.findFileContent(pathBase);
        const contentCSS = FileHelper.findFileContent(pathCSS);
        const contentTemplate = FileHelper.findFileContent(pathTemplate);
        let content = this.buildContent(contentTemplate, values);
        content = this.buildContent(contentBase, { style: contentCSS, content });
        content = this.buildComponents(content);
        return content;
    }
    getPathTemplate(type) {
        const name = this.mapping[type] ?? this.mapping[EmailType.DEFAULT];
        const path = `${this.pathTemplates}/${name}.template.html`;
        return path;
    }
    getPathBase() {
        const path = `${this.pathTemplates}/base.html`;
        return path;
    }
    getPathCSS() {
        const path = `${this.pathTemplates}/style.css`;
        return path;
    }
    buildContent(content, values) {
        let contentBuilt = content;
        for (const [key, value] of Object.entries(values)) {
            const token = new RegExp(`\{\{ ${key} \}\}`, 'g');
            contentBuilt = contentBuilt.replace(token, value);
        }
        return contentBuilt;
    }
    buildComponents(content) {
        let contentUpdated = content;
        for (const [key, value] of Object.entries(Components)) {
            const tag = new RegExp(`${key}`, 'g');
            contentUpdated = contentUpdated.replace(tag, value);
        }
        return contentUpdated;
    }
};
EmailTemplateService = __decorate([
    Injectable()
], EmailTemplateService);
export { EmailTemplateService };
