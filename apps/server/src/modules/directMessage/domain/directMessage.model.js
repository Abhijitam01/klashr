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
let DirectMessage = class DirectMessage {
    id;
    content;
    senderId;
    sender;
    receiverId;
    receiver;
    dateCreated;
    dateUpdated;
    dateDeleted;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DirectMessage.prototype, "id", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], DirectMessage.prototype, "content", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], DirectMessage.prototype, "senderId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.directMessagesAsSender),
    JoinColumn({ name: 'senderId' }),
    __metadata("design:type", User)
], DirectMessage.prototype, "sender", void 0);
__decorate([
    Column({}),
    __metadata("design:type", String)
], DirectMessage.prototype, "receiverId", void 0);
__decorate([
    ManyToOne(() => User, parent => parent.directMessagesAsReceiver),
    JoinColumn({ name: 'receiverId' }),
    __metadata("design:type", User)
], DirectMessage.prototype, "receiver", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", String)
], DirectMessage.prototype, "dateCreated", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", String)
], DirectMessage.prototype, "dateUpdated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], DirectMessage.prototype, "dateDeleted", void 0);
DirectMessage = __decorate([
    Entity()
], DirectMessage);
export { DirectMessage };
