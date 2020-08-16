var mongoose = require("mongoose");
var UserModel = require('./userBase');

var CapSchema = require('./cap').CapSchema;
var ShiftSchema = require('./shift').ShiftSchema;

var DriverSchema = new mongoose.Schema({
    plateNumber :{ type: mongoose.Schema.Types.String},
    cap_id: {type: mongoose.Schema.Types.String},
    shift_id: {type: mongoose.Schema.Types.String}
  }, UserModel.defaultOptions);



var Driver = UserModel.UserBase.discriminator('Driver', DriverSchema);
module.exports = {
  Driver: Driver
}