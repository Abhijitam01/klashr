var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationApplicationModule } from './authentication/application';
import { AuthorizationApplicationModule } from './authorization/application';
import { UserApplicationModule } from './user/application';
import { PostDataApplicationModule } from './postData/application';
import { LikeApplicationModule } from './like/application';
import { CommentApplicationModule } from './comment/application';
import { GroupApplicationModule } from './group/application';
import { GroupMemberApplicationModule } from './groupMember/application';
import { GroupPostApplicationModule } from './groupPost/application';
import { GroupPostLikeApplicationModule } from './groupPostLike/application';
import { GroupPostCommentApplicationModule } from './groupPostComment/application';
import { DirectMessageApplicationModule } from './directMessage/application';
import { AiApplicationModule } from './ai/application/ai.application.module';
import { BillingApplicationModule } from './billing/application';
import { NotificationApplicationModule } from './notification/application/notification.application.module';
import { UploadApplicationModule } from './upload/application/upload.application.module';
let AppApplicationModule = class AppApplicationModule {
};
AppApplicationModule = __decorate([
    Module({
        imports: [
            AuthenticationApplicationModule,
            UserApplicationModule,
            AuthorizationApplicationModule,
            NotificationApplicationModule,
            AiApplicationModule,
            UploadApplicationModule,
            BillingApplicationModule,
            PostDataApplicationModule,
            LikeApplicationModule,
            CommentApplicationModule,
            GroupApplicationModule,
            GroupMemberApplicationModule,
            GroupPostApplicationModule,
            GroupPostLikeApplicationModule,
            GroupPostCommentApplicationModule,
            DirectMessageApplicationModule,
        ],
        controllers: [],
        providers: [],
    })
], AppApplicationModule);
export { AppApplicationModule };
