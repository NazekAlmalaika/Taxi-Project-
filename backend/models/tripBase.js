var mongoose = require("mongoose");
var options = {discriminatorKey: 'kind'};

var TripBaseSchema = new mongoose.Schema({
    created :{ type: mongoose.Schema.Types.String},
    updated: { type: mongoose.Schema.Types.String},
    createdBy: { type: mongoose.Schema.Types.String},
    active: { type: mongoose.Schema.Types.Boolean},
    estimatedCost: { type: mongoose.Schema.Types.Number },
    estimatedDuration : {type: mongoose.Schema.Types.Date},
    startTime : {type: mongoose.Schema.Types.Date}, 
    estimatedEndTime : {type: mongoose.Schema.Types.Date}
  }, options);

var TipBase = mongoose.model('sObject', TripBaseSchema);
module.exports = {
  TipBase: TipBase,
  defaultOptions: options
}