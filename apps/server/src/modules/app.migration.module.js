var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ExceptionModule } from "../core/exception";
import { EventModule } from "../libraries/event";
import { ConfigurationModule } from '../core/configuration/configuration.module';
import { DatabaseConfigurationModule, DatabaseMigrationModule, DatabaseSetupModule, } from '../core/database';
import { LoggerModule } from '../libraries/logger';
import { AppDomainModule } from './app.domain.module';
let AppMigrationModule = class AppMigrationModule {
};
AppMigrationModule = __decorate([
    Module({
        imports: [
            ConfigurationModule,
            LoggerModule,
            ExceptionModule,
            EventModule,
            DatabaseConfigurationModule,
            DatabaseSetupModule,
            DatabaseMigrationModule,
            AppDomainModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppMigrationModule);
export { AppMigrationModule };
