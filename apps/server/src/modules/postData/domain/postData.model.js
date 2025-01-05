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
import { User } from '../../../modules/user/domain';
import { Like } from '../../../modules/like/domain';
import { Comment } from '../../../modules/comment/domain';
let PostData = class PostData {
    id;
    content;
    userId;
    user;
    likes;
    comments;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], PostData.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], PostData.prototype, "content", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], PostData.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.posts),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], PostData.prototype, "user", void 0);
__decorate([
    OneToMany(() => Like, child => child.post),
    __metadata("design:type", Array)
], PostData.prototype, "likes", void 0);
__decorate([
    OneToMany(() => Comment, child => child.post),
    __metadata("design:type", Array)
], PostData.prototype, "comments", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], PostData.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], PostData.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], PostData.prototype, "dateDeleted", void 0);
PostData = __decorate([
    Entity()
], PostData);
export { PostData };
