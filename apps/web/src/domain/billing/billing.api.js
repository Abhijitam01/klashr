import { HttpService } from '../../core/http';
/**
 * @provider BillingApi
 * @description A library to query the billing API
 * @function {() => Promise<BillingProduct[]>} findManyProducts - Find many products
 * @function {() => Promise<BillingSubscription[]>} findManySubscriptions - Find many subscriptions
 * @function {() => Promise<BillingPayment[]>} findManyPayments - Find many payments
 * @function {(productId: string) => Promise<string>} createPaymentLink - Create a payment link for a product
 * @usage `Api.Billing.findManyProducts(); Api.Billing.findManySubscriptions()`
 * @isImportOverriden false
 * @import import { Api } from '@web/domain'
 */
export class BillingApi {
    static findManyProducts() {
        return HttpService.api.get(`/v1/billing/products`);
    }
    static findManySubscriptions() {
        return HttpService.api.get(`/v1/users/me/billing/subscriptions`);
    }
    static findManyPayments() {
        return HttpService.api.get(`/v1/users/me/billing/payments`);
    }
    static createPaymentLink(productId) {
        return HttpService.api
            .post(`/v1/users/me/billing/products/${productId}/payment-link`, {})
            .then(({ url }) => url);
    }
}
