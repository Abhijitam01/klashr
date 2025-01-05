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
import { ConfigurationService } from "../../../../../core/configuration";
import { LoggerService } from "../../../../logger";
import { Stripe as StripeSDK } from 'stripe';
import { ProductType, } from '../../payment.type';
let StripeProvider = class StripeProvider {
    configurationService;
    loggerService;
    logger;
    client;
    webhookSecret;
    constructor(configurationService, loggerService) {
        this.configurationService = configurationService;
        this.loggerService = loggerService;
        this.logger = this.loggerService.create({ name: 'StripeProvider' });
        this.initialise();
    }
    isActive() {
        if (this.client) {
            return true;
        }
        else {
            return false;
        }
    }
    initialise() {
        this.logger.log('Initialization...');
        try {
            const secretKey = this.configurationService.get('SERVER_PAYMENT_STRIPE_SECRET_KEY');
            this.webhookSecret = this.configurationService.get('SERVER_PAYMENT_STRIPE_WEBHOOK_SECRET');
            if (!this.webhookSecret && !secretKey) {
                throw new Error('Set SERVER_PAYMENT_STRIPE_SECRET_KEY && SERVER_PAYMENT_STRIPE_WEBHOOK_SECRET in your .env to activate');
            }
            if (!this.webhookSecret) {
                throw new Error('Set SERVER_PAYMENT_STRIPE_WEBHOOK_SECRET in your .env to activate');
            }
            if (!secretKey) {
                throw new Error('Set SERVER_PAYMENT_STRIPE_SECRET_KEY in your .env to activate');
            }
            this.client = new StripeSDK(secretKey, {
                apiVersion: '2024-04-10',
            });
            this.logger.success(`Stripe active`);
        }
        catch (error) {
            this.logger.warning(`Stripe failed to start`);
            this.logger.warning(error);
        }
    }
    async findManySubscriptions(customerId) {
        const response = await this.client.subscriptions.list({
            customer: customerId,
        });
        const subscriptions = [];
        for (const subscription of response.data) {
            subscriptions.push({
                productId: subscription.items?.data?.[0].price?.product,
                dateExpired: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            });
        }
        return subscriptions;
    }
    async findManyPayments(customerId) {
        const response = await this.client.checkout.sessions.list({
            expand: ['data.line_items'],
            customer: customerId,
        });
        const checkoutSessions = response.data?.filter(session => session.payment_status === 'paid');
        const payments = [];
        for (const session of checkoutSessions) {
            for (const lineItem of session.line_items.data) {
                payments.push({
                    productId: lineItem.price.product,
                    amount: lineItem.price.unit_amount / 100,
                    currency: lineItem.price.currency,
                    date: new Date(session.created * 1000),
                });
            }
        }
        return payments;
    }
    async findManyProducts() {
        const response = await this.client.products.list({
            expand: ['data.default_price'],
        });
        const products = [];
        for (const item of response.data) {
            const product = {
                id: item.id,
                type: ProductType.ONE_TIME,
                name: item.name,
                price: 0,
                description: item.description,
            };
            const price = item.default_price;
            if (price?.recurring) {
                product.type = ProductType.SUBSCRIPTION;
            }
            product.price = price?.unit_amount / 100 || 0;
            products.push(product);
        }
        return products;
    }
    async onPayment(body, sig) {
        try {
            const event = this.client.webhooks.constructEvent(body.toString(), sig, this.webhookSecret);
            const data = event.data?.object;
            if (event.type === 'checkout.session.completed') {
                this.logger.success(`Stripe event "${event.type}" received`);
                return {
                    userId: data.client_reference_id,
                    stripeCustomerId: data.customer,
                    metadata: data.metadata ?? {},
                    customerDetails: data.customer_details,
                };
            }
            this.logger.log(`Stripe event "${event.type}" is not handled.`);
            return null;
        }
        catch (error) {
            throw new Error(`Could not check webhook: ${error.message}`);
        }
    }
    async createPaymentLink({ customerId, productId, urlRedirection, metadata = {}, }) {
        const price = await this.findOnePriceByIdOrFail(productId);
        const session = await this.client.checkout.sessions.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: price.recurring ? 'subscription' : 'payment',
            customer: customerId,
            ui_mode: 'hosted',
            success_url: urlRedirection,
            metadata: metadata,
        });
        return session.url;
    }
    async createCustomer(customer) {
        const result = await this.client.customers.create({
            name: customer.name,
            email: customer.email,
        });
        return result.id;
    }
    async findOnePriceByIdOrFail(productId) {
        const prices = await this.client.prices.list({
            product: productId,
            limit: 1,
        });
        const price = prices.data?.[0];
        if (!price) {
            throw new Error(`Could not find price for product ${productId}`);
        }
        return price;
    }
};
StripeProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigurationService,
        LoggerService])
], StripeProvider);
export { StripeProvider };
