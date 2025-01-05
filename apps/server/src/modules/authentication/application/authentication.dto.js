var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, } from 'class-validator';
export class AuthenticationLoginDto {
    email;
    password;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationLoginDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationLoginDto.prototype, "password", void 0);
export class AuthenticationRegisterDto {
    email;
    name;
    password;
}
__decorate([
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationRegisterDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationRegisterDto.prototype, "name", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    MinLength(8),
    MaxLength(32),
    Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], AuthenticationRegisterDto.prototype, "password", void 0);
export class AuthenticationResetPasswordDto {
    token;
    password;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationResetPasswordDto.prototype, "token", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
        message: 'Password must contain at least one letter, one number, and one special character.',
    }),
    __metadata("design:type", String)
], AuthenticationResetPasswordDto.prototype, "password", void 0);
export class AuthenticationSendEmailResetPasswordDto {
    email;
}
__decorate([
    IsEmail(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AuthenticationSendEmailResetPasswordDto.prototype, "email", void 0);
export class GoogleByAuthenticationCallbackDto {
    token;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], GoogleByAuthenticationCallbackDto.prototype, "token", void 0);
