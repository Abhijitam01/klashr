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
import { GroupMember } from '../../../modules/groupMember/domain';
import { GroupPost } from '../../../modules/groupPost/domain';
let Group = class Group {
    id;
    name;
    description;
    groupMembers;
    groupPosts;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    OneToMany(() => GroupMember, child => child.group),
    __metadata("design:type", Array)
], Group.prototype, "groupMembers", void 0);
__decorate([
    OneToMany(() => GroupPost, child => child.group),
    __metadata("design:type", Array)
], Group.prototype, "groupPosts", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Group.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], Group.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], Group.prototype, "dateDeleted", void 0);
Group = __decorate([
    Entity()
], Group);
export { Group };
