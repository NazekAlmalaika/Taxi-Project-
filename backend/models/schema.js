var DriverSchema = require('./drivers');
var TripSchema = require('./trips');
var RiderSchema = require('./riders');
var CapSchema = require('./cap');
var BillingSchema = require('./billing');
var BillingMethodSchema = require('./billingMethod');
var LocationSchema = require('./location');
var BookingSchema = require('./booking');
var ShiftSchema = require('./shift');


const Entities = {
    RIDER: RiderSchema.Rider,
    TRIP: TripSchema.Trip,
    BILLING_METHOD: BillingMethodSchema.BillingMethod,
    BILLING: BillingSchema.Billing,
    CAP: CapSchema.Cap,
    DRIVER: DriverSchema.Driver,
    LOCATION: LocationSchema.Location,
    BOOKING: BookingSchema.Booking ,
    SHIFT: ShiftSchema.Shift
}


module.exports = Entities;