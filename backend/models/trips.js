var mongoose = require("mongoose");

var TripSchema = new mongoose.Schema({
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = {
  Trip: Trip
}