var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Min } from 'class-validator';
import { User } from "../../../user/domain";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
export var AuthorizationCodeType;
(function (AuthorizationCodeType) {
    AuthorizationCodeType["USER_VERIFICATION"] = "user.verification";
})(AuthorizationCodeType || (AuthorizationCodeType = {}));
export var AuthorizationCodeStatus;
(function (AuthorizationCodeStatus) {
    AuthorizationCodeStatus["ACTIVE"] = "ACTIVE";
    AuthorizationCodeStatus["USED"] = "USED";
    AuthorizationCodeStatus["EXPIRED"] = "EXPIRED";
})(AuthorizationCodeStatus || (AuthorizationCodeStatus = {}));
let AuthorizationCode = class AuthorizationCode {
    id;
    keyPublic;
    keyPrivate;
    durationMinutes;
    type;
    status;
    dateCreated;
    dateDeleted;
    /* -------------------------------- RELATIONS ------------------------------- */
    userId;
    user;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "keyPublic", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "keyPrivate", void 0);
__decorate([
    Column({ default: 60 }),
    Min(0),
    __metadata("design:type", Number)
], AuthorizationCode.prototype, "durationMinutes", void 0);
__decorate([
    Column({ enum: AuthorizationCodeType }),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "type", void 0);
__decorate([
    Column({
        enum: AuthorizationCodeStatus,
        default: AuthorizationCodeStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "status", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp with time zone' }),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "dateCreated", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "dateDeleted", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AuthorizationCode.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], AuthorizationCode.prototype, "user", void 0);
AuthorizationCode = __decorate([
    Entity()
], AuthorizationCode);
export { AuthorizationCode };
