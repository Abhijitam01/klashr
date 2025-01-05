var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsOptional, IsString, } from 'class-validator';
export class DirectMessageCreateDto {
    content;
    senderId;
    receiverId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "senderId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "receiverId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageCreateDto.prototype, "dateUpdated", void 0);
export class DirectMessageUpdateDto {
    content;
    senderId;
    receiverId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "senderId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "receiverId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], DirectMessageUpdateDto.prototype, "dateUpdated", void 0);
