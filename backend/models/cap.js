var mongoose = require("mongoose");
var options = {timestamps: true};

var CapSchema = new mongoose.Schema({
     plateNumber: {type: mongoose.Schema.Types.String},
     model: {type: mongoose.Schema.Types.String},
     color: {type: mongoose.Schema.Types.String},
     capacity: {type: mongoose.Schema.Types.String},
     type: {type: mongoose.Schema.Types.String},
     verified: {type: mongoose.Schema.Types.Boolean} 
  }, options);



var Cap = mongoose.model('Cap', CapSchema);
module.exports = {
  Cap: Cap,
  CapSchema: CapSchema
}