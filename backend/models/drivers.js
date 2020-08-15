var mongoose = require("mongoose");
var UserModel = require('./userBase');

var CapSchema = require('./cap').CapSchema;
var ShiftSchema = require('./shift').ShiftSchema;

var DriverSchema = new mongoose.Schema({
    plateNumber :{ type: mongoose.Schema.Types.String},
    cap: {type: CapSchema},
    shift: {type: ShiftSchema}
  }, UserModel.defaultOptions);



var Driver = UserModel.UserBase.discriminator('Driver', DriverSchema);
module.exports = {
  Driver: Driver
}