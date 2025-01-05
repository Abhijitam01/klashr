var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { StripeProvider } from './internal/providers/stripe/stripe.provider';
let PaymentService = class PaymentService {
    stripeProvider;
    provider;
    constructor(stripeProvider) {
        this.stripeProvider = stripeProvider;
    }
    async onModuleInit() {
        if (this.stripeProvider.isActive()) {
            this.provider = this.stripeProvider;
        }
    }
    isActive() {
        if (this.provider) {
            return this.provider?.isActive();
        }
        return false;
    }
    getCustomerId(user) {
        return user.stripeCustomerId;
    }
    async findManyProducts() {
        return this.provider.findManyProducts();
    }
    async findManySubscriptions(user) {
        return this.provider.findManySubscriptions(this.getCustomerId(user));
    }
    async findManyPayments(user) {
        return this.provider.findManyPayments(this.getCustomerId(user));
    }
    async createPaymentLink(options) {
        const optionsPayment = {
            ...options,
            customerId: this.getCustomerId(options.user),
        };
        return this.provider.createPaymentLink(optionsPayment);
    }
    async onPayment(body, sig) {
        return this.provider.onPayment(body, sig);
    }
    async createCustomer(user) {
        return this.provider.createCustomer({
            name: user.name ?? user.email,
            email: user.email,
        });
    }
};
PaymentService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [StripeProvider])
], PaymentService);
export { PaymentService };
