var mongoose = require("mongoose");
var UserModel = require('./userBase');

var RiderSchema = new mongoose.Schema({
 
  }, UserModel.defaultOptions);



var Rider = UserModel.UserBase.discriminator('Rider', RiderSchema);
module.exports = {
  Rider: Rider
}