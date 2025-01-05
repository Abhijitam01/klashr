var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from "../../authentication/domain";
import { PostDataDomainModule } from '../domain';
import { PostDataController } from './postData.controller';
import { UserDomainModule } from '../../../modules/user/domain';
import { PostDataByUserController } from './postDataByUser.controller';
let PostDataApplicationModule = class PostDataApplicationModule {
};
PostDataApplicationModule = __decorate([
    Module({
        imports: [AuthenticationDomainModule, PostDataDomainModule, UserDomainModule],
        controllers: [PostDataController, PostDataByUserController],
        providers: [],
    })
], PostDataApplicationModule);
export { PostDataApplicationModule };
