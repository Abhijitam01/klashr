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
export class PostDataCreateDto {
    content;
    userId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PostDataCreateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataCreateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataCreateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataCreateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataCreateDto.prototype, "dateUpdated", void 0);
export class PostDataUpdateDto {
    content;
    userId;
    dateCreated;
    dateDeleted;
    dateUpdated;
}
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataUpdateDto.prototype, "content", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataUpdateDto.prototype, "userId", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataUpdateDto.prototype, "dateCreated", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataUpdateDto.prototype, "dateDeleted", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], PostDataUpdateDto.prototype, "dateUpdated", void 0);
