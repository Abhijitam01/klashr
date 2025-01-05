export class BillingSubscription {
    productId;
    dateExpired;
    status;
}
export class BillingPayment {
    productId;
    amount;
    currency;
    date;
}
export class BillingProduct {
    id;
    type;
    name;
    price;
    description;
}
