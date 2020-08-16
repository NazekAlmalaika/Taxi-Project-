var mongoose = require("mongoose");
var TripSchema = require("./trips").TripSchema;
var TripBaseModel = require('./tripBase');

var BookingSchema = new mongoose.Schema({
    estimatedCost: {type: mongoose.Schema.Types.Number},
    estimatedDuration: {type: mongoose.Schema.Types.Number},
    currency: {type: mongoose.Schema.Types.String},
    startTime: {type: mongoose.Schema.Types.Date},
    estimatedEndTime: {type: mongoose.Schema.Types.Date},
    //trip: {type: TripSchema}
    trip_id: {type: mongoose.Schema.Types.String}

}, TripBaseModel.defaultOptions);

var Booking = TripBaseModel.TipBase.discriminator('Booking', BookingSchema);

module.exports = {
    Booking: Booking,
    BookingSchema: BookingSchema
}