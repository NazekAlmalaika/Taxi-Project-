var mongoose = require("mongoose");
var options = {timestamps: true};

var LocationSchema = new mongoose.Schema({
     lat: {type: mongoose.Schema.Types.String},
     lan: {type: mongoose.Schema.Types.String},
     
  }, options);

var Location = mongoose.model('Location', LocationSchema);
module.exports = {
  Location: Location,
  LocationSchema: LocationSchema
}