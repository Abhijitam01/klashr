var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from "../../authentication/domain";
import { GroupPostDomainModule } from '../domain';
import { GroupPostController } from './groupPost.controller';
import { GroupDomainModule } from '../../../modules/group/domain';
import { GroupPostByGroupController } from './groupPostByGroup.controller';
import { UserDomainModule } from '../../../modules/user/domain';
import { GroupPostByUserController } from './groupPostByUser.controller';
let GroupPostApplicationModule = class GroupPostApplicationModule {
};
GroupPostApplicationModule = __decorate([
    Module({
        imports: [
            AuthenticationDomainModule,
            GroupPostDomainModule,
            GroupDomainModule,
            UserDomainModule,
        ],
        controllers: [
            GroupPostController,
            GroupPostByGroupController,
            GroupPostByUserController,
        ],
        providers: [],
    })
], GroupPostApplicationModule);
export { GroupPostApplicationModule };
