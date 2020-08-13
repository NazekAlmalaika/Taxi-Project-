var mongoose = require("mongoose");
var UserModel = require('./userBase');

var DriverSchema = new mongoose.Schema({
    plateNumber :{ type: mongoose.Schema.Types.String},
    email: { type: mongoose.Schema.Types.String}
  }, UserModel.defaultOptions);



var Driver = UserModel.UserBase.discriminator('Driver', DriverSchema);
module.exports = {
  Driver: Driver
}