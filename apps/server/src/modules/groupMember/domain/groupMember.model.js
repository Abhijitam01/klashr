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
import { Group } from '../../../modules/group/domain';
import { User } from '../../../modules/user/domain';
let GroupMember = class GroupMember {
    id;
    groupId;
    group;
    userId;
    user;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], GroupMember.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupMember.prototype, "groupId", void 0);
__decorate([
    ManyToOne(() => Group, parent => parent.groupMembers),
    JoinColumn({ name: 'groupId' }),
    __metadata("design:type", Group)
], GroupMember.prototype, "group", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], GroupMember.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.groupMembers),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], GroupMember.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], GroupMember.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], GroupMember.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], GroupMember.prototype, "dateDeleted", void 0);
GroupMember = __decorate([
    Entity()
], GroupMember);
export { GroupMember };
