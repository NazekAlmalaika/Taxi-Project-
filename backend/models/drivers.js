var mongoose = require("mongoose");
var User = require('./users');

var DriverSchema = new mongoose.Schema({
    plateNumber :{ type: mongoose.Schema.Types.String},
    email: { type: mongoose.Schema.Types.String},
    userInfo: User,
  });



var Driver = mongoose.model('Driver', DriverSchema);
module.exports = {
  Driver: Driver
}