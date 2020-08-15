var DriverSchema = require('./drivers');
var TripSchema = require('./trips');
var RiderSchema = require('./riders');
var CapSchema = require('./cap');
var BillingSchema = require('./billing');
var BillingMethodSchema = require('./billingMethod');
var LocationSchema = require('./location');
var BookingSchema = require('./booking');
var ShiftSchema = require('./shift');


class Schema {
    static RIDER = new Schema(RiderSchema.Rider);
    static TRIP = new Schema(TripSchema.Trip);
    static BILLING_METHOD = new Schema(BillingMethodSchema.BillingMethod);
    static BILLING = new Schema(BillingSchema.Billing);
    static CAP = new Schema(CapSchema.Cap);
    static DRIVER = new Schema(DriverSchema.Driver);
    static LOCATION = new Schema(LocationSchema.Location);
    static BOOKING = new Schema(BookingSchema.Booking);
    static SHIFT = new Schema(ShiftSchema.Shift);

    constructor(schemaModel) {
       this.schemaModel = schemaModel;
    };

    static getEntityModel(entityCode) {
        switch (entityCode) {
            case 'r':
              return Schema.RIDER;
            case 't':
              return Schema.TRIP;
            case 'b':
              return Schema.BILLING;
            case 'bm':
              return Schema.BILLING_METHOD;
            case 'c':
              return Schema.CAP;
            case 'd':
              return Schema.DRIVER;
            case 'l':
              return Schema.LOCATION;
            case 'bo':
              return Schema.BOOKING;
            case 's':
              return Schema.SHIFT;
            default: {
                console.log('no model found');
                return null;
            }
              
          }
    };
}

module.exports = Schema;