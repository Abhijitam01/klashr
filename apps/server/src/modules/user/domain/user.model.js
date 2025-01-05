var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Notification } from '../../../modules/notification/domain';
import { PostData } from '../../../modules/postData/domain';
import { Like } from '../../../modules/like/domain';
import { Comment } from '../../../modules/comment/domain';
import { GroupMember } from '../../../modules/groupMember/domain';
import { GroupPost } from '../../../modules/groupPost/domain';
import { GroupPostLike } from '../../../modules/groupPostLike/domain';
import { GroupPostComment } from '../../../modules/groupPostComment/domain';
import { DirectMessage } from '../../../modules/directMessage/domain';
export var UserStatus;
(function (UserStatus) {
    UserStatus["VERIFIED"] = "VERIFIED";
    UserStatus["CREATED"] = "CREATED";
})(UserStatus || (UserStatus = {}));
let User = class User {
    id;
    email;
    name;
    pictureUrl;
    stripeCustomerId;
    password;
    status;
    posts;
    likes;
    comments;
    groupMembers;
    groupPosts;
    groupPostLikes;
    groupPostComments;
    directMessagesAsSender;
    directMessagesAsReceiver;
    notifications;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "pictureUrl", void 0);
__decorate([
    Column({ nullable: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "stripeCustomerId", void 0);
__decorate([
    Column({ nullable: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ enum: UserStatus, default: UserStatus.VERIFIED }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    OneToMany(() => PostData, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    OneToMany(() => Like, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    OneToMany(() => Comment, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    OneToMany(() => GroupMember, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "groupMembers", void 0);
__decorate([
    OneToMany(() => GroupPost, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "groupPosts", void 0);
__decorate([
    OneToMany(() => GroupPostLike, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "groupPostLikes", void 0);
__decorate([
    OneToMany(() => GroupPostComment, child => child.user),
    __metadata("design:type", Array)
], User.prototype, "groupPostComments", void 0);
__decorate([
    OneToMany(() => DirectMessage, child => child.sender),
    __metadata("design:type", Array)
], User.prototype, "directMessagesAsSender", void 0);
__decorate([
    OneToMany(() => DirectMessage, child => child.receiver),
    __metadata("design:type", Array)
], User.prototype, "directMessagesAsReceiver", void 0);
__decorate([
    OneToMany(() => Notification, notification => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], User.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], User.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], User.prototype, "dateDeleted", void 0);
User = __decorate([
    Entity()
], User);
export { User };
