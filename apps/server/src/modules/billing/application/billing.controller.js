var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Authentication } from "../../../core/authentication";
import { ConfigurationService } from "../../../core/configuration";
import { RequestHelper } from "../../../helpers/request";
import { Utility } from "../../../helpers/utility";
import { LoggerService } from "../../../libraries/logger";
import { PaymentService } from "../../../libraries/payment";
import { AuthenticationDomainFacade } from "../../authentication/domain";
import { UserDomainFacade } from "../../user/domain";
import { BillingApplicationException } from './billing.application.exception';
let BillingController = class BillingController {
    exception;
    userDomainFacade;
    paymentService;
    loggerService;
    logger;
    constructor(exception, userDomainFacade, paymentService, loggerService) {
        this.exception = exception;
        this.userDomainFacade = userDomainFacade;
        this.paymentService = paymentService;
        this.loggerService = loggerService;
        this.logger = this.loggerService.create({ name: 'BillingController' });
    }
    async products() {
        if (!this.paymentService.isActive()) {
            this.exception.paymentNotActivated();
        }
        return this.paymentService.findManyProducts();
    }
    async handleStripeWebhook(request) {
        if (!this.paymentService.isActive()) {
            this.exception.paymentNotActivated();
        }
        this.logger.log(`Stripe webhook received`);
        const body = RequestHelper.getRawBody(request);
        const sig = request.headers['stripe-signature'];
        try {
            const data = await this.paymentService.onPayment(body, sig);
            if (!data) {
                return;
            }
            const { userId, stripeCustomerId, metadata } = data;
            if (Utility.isDefined(userId)) {
                const user = await this.userDomainFacade.findOneByIdOrFail(userId);
                if (Utility.isDefined(stripeCustomerId)) {
                    await this.userDomainFacade.update(user, { stripeCustomerId });
                    this.logger.log(`Stripe customer id "${stripeCustomerId}" saved on user "${user.id}"`);
                }
                return;
            }
            if (Utility.isDefined(stripeCustomerId)) {
                const user = await this.userDomainFacade.findOneByStripeCustomerIdOrFail(stripeCustomerId);
                this.logger.log(`Found user "${user.id}" with stripe customer id "${stripeCustomerId}"`);
                return;
            }
        }
        catch (error) {
            this.logger.error(`Could not handle Stripe webhook`);
            this.logger.error(error);
        }
    }
};
__decorate([
    Get('/products'),
    Authentication.Public(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "products", null);
__decorate([
    Authentication.Public(),
    Post('/stripe/webhook/raw'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "handleStripeWebhook", null);
BillingController = __decorate([
    Controller('/v1/billing'),
    __metadata("design:paramtypes", [BillingApplicationException,
        UserDomainFacade,
        PaymentService,
        LoggerService])
], BillingController);
export { BillingController };
let BillingByMeController = class BillingByMeController {
    exception;
    authenticationDomainFacade;
    configurationService;
    userDomainFacade;
    paymentService;
    constructor(exception, authenticationDomainFacade, configurationService, userDomainFacade, paymentService) {
        this.exception = exception;
        this.authenticationDomainFacade = authenticationDomainFacade;
        this.configurationService = configurationService;
        this.userDomainFacade = userDomainFacade;
        this.paymentService = paymentService;
    }
    async findManyPayments(request) {
        if (!this.paymentService.isActive()) {
            this.exception.paymentNotActivated();
        }
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = await this.findOneUserOrFail(payload.user.id);
        if (!this.paymentService.getCustomerId(user)) {
            this.exception.noCustomerId(user.id);
        }
        const payments = await this.paymentService.findManyPayments(user);
        return payments;
    }
    async findManySubscriptions(request) {
        if (!this.paymentService.isActive()) {
            this.exception.paymentNotActivated();
        }
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        const user = await this.findOneUserOrFail(payload.user.id);
        if (!this.paymentService.getCustomerId(user)) {
            this.exception.noCustomerId(user.id);
        }
        const subscriptions = await this.paymentService.findManySubscriptions(user);
        return subscriptions;
    }
    async getPaymentLink(request, productId) {
        if (!this.paymentService.isActive()) {
            this.exception.paymentNotActivated();
        }
        const payload = this.authenticationDomainFacade.getRequestPayload(request);
        let user = await this.findOneUserOrFail(payload.user.id);
        let stripeCustomerId = this.paymentService.getCustomerId(user);
        if (Utility.isNull(stripeCustomerId)) {
            stripeCustomerId = await this.paymentService.createCustomer(user);
            user = await this.userDomainFacade.update(user, {
                stripeCustomerId,
            });
        }
        const urlRedirection = this.configurationService.getClientBaseUrl();
        const url = await this.paymentService.createPaymentLink({
            user,
            productId,
            metadata: {},
            urlRedirection,
        });
        return { url };
    }
    async findOneUserOrFail(userId) {
        const user = await this.userDomainFacade.findOneByIdWithStripeCustomerIdOrFail(userId);
        return user;
    }
};
__decorate([
    Get('/payments'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingByMeController.prototype, "findManyPayments", null);
__decorate([
    Get('/subscriptions'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingByMeController.prototype, "findManySubscriptions", null);
__decorate([
    Post('/products/:productId/payment-link'),
    __param(0, Req()),
    __param(1, Param('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillingByMeController.prototype, "getPaymentLink", null);
BillingByMeController = __decorate([
    Controller('/v1/users/me/billing'),
    __metadata("design:paramtypes", [BillingApplicationException,
        AuthenticationDomainFacade,
        ConfigurationService,
        UserDomainFacade,
        PaymentService])
], BillingByMeController);
export { BillingByMeController };
