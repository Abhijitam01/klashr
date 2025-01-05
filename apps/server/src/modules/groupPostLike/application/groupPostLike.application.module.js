var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from "../../authentication/domain";
import { GroupPostLikeDomainModule } from '../domain';
import { GroupPostLikeController } from './groupPostLike.controller';
import { UserDomainModule } from '../../../modules/user/domain';
import { GroupPostLikeByUserController } from './groupPostLikeByUser.controller';
import { GroupPostDomainModule } from '../../../modules/groupPost/domain';
import { GroupPostLikeByGroupPostController } from './groupPostLikeByGroupPost.controller';
let GroupPostLikeApplicationModule = class GroupPostLikeApplicationModule {
};
GroupPostLikeApplicationModule = __decorate([
    Module({
        imports: [
            AuthenticationDomainModule,
            GroupPostLikeDomainModule,
            UserDomainModule,
            GroupPostDomainModule,
        ],
        controllers: [
            GroupPostLikeController,
            GroupPostLikeByUserController,
            GroupPostLikeByGroupPostController,
        ],
        providers: [],
    })
], GroupPostLikeApplicationModule);
export { GroupPostLikeApplicationModule };
