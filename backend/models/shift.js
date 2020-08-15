var mongoose = require("mongoose");
var options = {timestamps: true};

var ShiftSchema = new mongoose.Schema({
     starttime: {type: mongoose.Schema.Types.Number},
     endtime: {type: mongoose.Schema.Types.Number},
     daysOfweek: [mongoose.Schema.Types.Number]
  }, options);



var Shift = mongoose.model('Shift', ShiftSchema);
module.exports = {
  Shift: Shift,
  ShiftSchema: ShiftSchema
}