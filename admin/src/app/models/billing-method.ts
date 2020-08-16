export class BillingMethod {
    _id: String;
    active: Boolean = false;
    paymentMethod: String;
    user_id: String;
    verified: Boolean;
    createdAt: Date;
    updatedAt: Date;
}
