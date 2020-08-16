export class User {
    _id: String;
    createdBy: String;
    active: Boolean = false;
    name : String;
    password: String;
    mobileNumber: Number;
    email: String;
    region: String;
    onilne: Boolean;
    address: String;
    createdAt: Date;
    updatedAt: Date;
    billing_id: String;
    billingMethods_id: [String];
    bookings_id: [String];
    defaultBillingMethod_id : String;

    constructor(){

    }


}
