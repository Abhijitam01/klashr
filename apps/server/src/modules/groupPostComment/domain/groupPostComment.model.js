var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { User } from '../../../modules/user/domain';
import { GroupPost } from '../../../modules/groupPost/domain';
let GroupPostComment = class GroupPostComment {
    id;
    content;
    userId;
    user;
    groupPostId;
    groupPost;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], GroupPostComment.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPostComment.prototype, "content", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPostComment.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.groupPostComments),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], GroupPostComment.prototype, "user", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPostComment.prototype, "groupPostId", void 0);
__decorate([
    ManyToOne(() => GroupPost, parent => parent.groupPostComments),
    JoinColumn({ name: 'groupPostId' }),
    __metadata("design:type", GroupPost)
], GroupPostComment.prototype, "groupPost", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], GroupPostComment.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], GroupPostComment.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], GroupPostComment.prototype, "dateDeleted", void 0);
GroupPostComment = __decorate([
    Entity()
], GroupPostComment);
export { GroupPostComment };
