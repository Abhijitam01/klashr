var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Group } from '../../../modules/group/domain';
import { User } from '../../../modules/user/domain';
import { GroupPostLike } from '../../../modules/groupPostLike/domain';
import { GroupPostComment } from '../../../modules/groupPostComment/domain';
let GroupPost = class GroupPost {
    id;
    content;
    groupId;
    group;
    userId;
    user;
    groupPostLikes;
    groupPostComments;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], GroupPost.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPost.prototype, "content", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPost.prototype, "groupId", void 0);
__decorate([
    ManyToOne(() => Group, parent => parent.groupPosts),
    JoinColumn({ name: 'groupId' }),
    __metadata("design:type", Group)
], GroupPost.prototype, "group", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupPost.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.groupPosts),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], GroupPost.prototype, "user", void 0);
__decorate([
    OneToMany(() => GroupPostLike, child => child.groupPost),
    __metadata("design:type", Array)
], GroupPost.prototype, "groupPostLikes", void 0);
__decorate([
    OneToMany(() => GroupPostComment, child => child.groupPost),
    __metadata("design:type", Array)
], GroupPost.prototype, "groupPostComments", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], GroupPost.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], GroupPost.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], GroupPost.prototype, "dateDeleted", void 0);
GroupPost = __decorate([
    Entity()
], GroupPost);
export { GroupPost };
