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
export class CommentCreateDto {
    content;
    userId;
    postId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "postId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "dateUpdated", void 0);
export class CommentUpdateDto {
    content;
    userId;
    postId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "postId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CommentUpdateDto.prototype, "dateUpdated", void 0);
