var mongoose = require("mongoose");
var User = require('./users');

var RiderSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.String},
    userInfo: User,
  });



var Rider = mongoose.model('Rider', RiderSchema);
module.exports = {
  Rider: Rider
}