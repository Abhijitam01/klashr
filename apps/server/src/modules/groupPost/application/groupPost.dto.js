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
export class GroupPostCreateDto {
    content;
    groupId;
    userId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "groupId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostCreateDto.prototype, "dateUpdated", void 0);
export class GroupPostUpdateDto {
    content;
    groupId;
    userId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "groupId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], GroupPostUpdateDto.prototype, "dateUpdated", void 0);
