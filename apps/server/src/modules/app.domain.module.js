var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from './authentication/domain';
import { AuthorizationDomainModule } from './authorization/domain';
import { UserDomainModule } from './user/domain';
import { NotificationDomainModule } from './notification/domain';
import { PostDataDomainModule } from './postData/domain';
import { LikeDomainModule } from './like/domain';
import { CommentDomainModule } from './comment/domain';
import { GroupDomainModule } from './group/domain';
import { GroupMemberDomainModule } from './groupMember/domain';
import { GroupPostDomainModule } from './groupPost/domain';
import { GroupPostLikeDomainModule } from './groupPostLike/domain';
import { GroupPostCommentDomainModule } from './groupPostComment/domain';
import { DirectMessageDomainModule } from './directMessage/domain';
let AppDomainModule = class AppDomainModule {
};
AppDomainModule = __decorate([
    Module({
        imports: [
            AuthenticationDomainModule,
            AuthorizationDomainModule,
            UserDomainModule,
            NotificationDomainModule,
            PostDataDomainModule,
            LikeDomainModule,
            CommentDomainModule,
            GroupDomainModule,
            GroupMemberDomainModule,
            GroupPostDomainModule,
            GroupPostLikeDomainModule,
            GroupPostCommentDomainModule,
            DirectMessageDomainModule,
        ],
        controllers: [],
        providers: [],
    })
], AppDomainModule);
export { AppDomainModule };
