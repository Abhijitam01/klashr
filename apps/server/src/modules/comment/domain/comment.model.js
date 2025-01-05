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
import { PostData } from '../../../modules/postData/domain';
let Comment = class Comment {
    id;
    content;
    userId;
    user;
    postId;
    post;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.comments),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], Comment.prototype, "user", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    ManyToOne(() => PostData, parent => parent.comments),
    JoinColumn({ name: 'postId' }),
    __metadata("design:type", PostData)
], Comment.prototype, "post", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Comment.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], Comment.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], Comment.prototype, "dateDeleted", void 0);
Comment = __decorate([
    Entity()
], Comment);
export { Comment };
