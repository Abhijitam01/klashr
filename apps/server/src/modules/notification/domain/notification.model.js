var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { User } from "../../user/domain";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
let Notification = class Notification {
    id;
    title;
    message;
    senderName;
    senderEmail;
    senderPictureUrl;
    redirectUrl;
    userId;
    user;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "senderName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "senderEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "senderPictureUrl", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "redirectUrl", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], Notification.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], Notification.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], Notification.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], Notification.prototype, "dateDeleted", void 0);
Notification = __decorate([
    Entity()
], Notification);
export { Notification };
