var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AccessControlModule } from "../core/accessControl";
import { CookieModule } from "../core/cookie";
import { ExceptionModule } from "../core/exception";
import { LoggingModule } from "../core/logging";
import { SocketModule } from "../libraries/socket";
import { UploadModule } from "../libraries/upload/upload.module";
import { ConfigurationModule } from '../core/configuration/configuration.module';
import { CorsModule } from '../core/cors/cors.module';
import { DatabaseConfigurationModule, DatabaseSetupModule, } from '../core/database';
import { EmailModule } from '../libraries/email/email.module';
import { EventModule } from '../libraries/event';
import { LoggerModule } from '../libraries/logger';
import { AppApplicationModule } from './app.application.module';
import { AppDomainModule } from './app.domain.module';
import { AppInfrastructureModule } from './app.infrastructure.module';
import { AppOrchestratorModule } from './app.orchestrator.module';
import { AuthenticationInfrastructureModule } from './authentication/infrastructure';
import { AuthorizationAccessControlModule } from './authorization/accessControl';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigurationModule,
            LoggerModule,
            ExceptionModule,
            DatabaseConfigurationModule,
            DatabaseSetupModule,
            CorsModule,
            EventModule,
            EmailModule,
            UploadModule,
            CookieModule,
            SocketModule,
            AccessControlModule,
            AppDomainModule,
            AppApplicationModule,
            AppInfrastructureModule,
            AppOrchestratorModule,
            LoggingModule,
        ],
        controllers: [],
        providers: [
            ...LoggingModule.getInterceptors(),
            ...AuthenticationInfrastructureModule.getGuards(),
            ...AuthorizationAccessControlModule.getGuards(),
            ...ExceptionModule.getFilters(),
        ],
        exports: [],
    })
], AppModule);
export { AppModule };
