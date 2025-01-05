var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthenticationDomainModule } from "../../authentication/domain";
import { CommentDomainModule } from '../domain';
import { CommentController } from './comment.controller';
import { UserDomainModule } from '../../../modules/user/domain';
import { CommentByUserController } from './commentByUser.controller';
import { PostDataDomainModule } from '../../../modules/postData/domain';
import { CommentByPostDataController } from './commentByPostData.controller';
let CommentApplicationModule = class CommentApplicationModule {
};
CommentApplicationModule = __decorate([
    Module({
        imports: [
            AuthenticationDomainModule,
            CommentDomainModule,
            UserDomainModule,
            PostDataDomainModule,
        ],
        controllers: [
            CommentController,
            CommentByUserController,
            CommentByPostDataController,
        ],
        providers: [],
    })
], CommentApplicationModule);
export { CommentApplicationModule };
