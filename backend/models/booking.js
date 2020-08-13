var mongoose = require("mongoose");
var TipBaseModel = require('./tripBase');

var BookingSchema = new mongoose.Schema({
}, TripBaseModel.defaultOptions);

var Booking = TipBaseModel.TipBase.discriminator('Booking', BookingSchema);

module.exports = {
    Booking: Booking
}