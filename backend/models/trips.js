var mongoose = require("mongoose");
var TripBaseModel = require('./tripBase');

var TripSchema = new mongoose.Schema({
}, TripBaseModel.defaultOptions);

var Trip = TripBaseModel.TipBase.discriminator('Trip', TripSchema);

module.exports = {
  Trip: Trip
}