var mongoose = require("mongoose");
var options = {discriminatorKey: 'kind'};

var TripBaseSchema = new mongoose.Schema({
    created :{ type: mongoose.Schema.Types.String},
    updated: { type: mongoose.Schema.Types.String},
    createdBy: { type: mongoose.Schema.Types.String},
    active: { type: mongoose.Schema.Types.Boolean},
  }, options);

var TipBase = mongoose.model('sObject', TripBaseSchema);
module.exports = {
  TipBase: TipBase,
  defaultOptions: options
}