var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name :{ type: mongoose.Schema.Types.String},
    password: { type: mongoose.Schema.Types.String, index: true, unique: true },
    mobileNumber: { type: mongoose.Schema.Types.Number},
  });


UserSchema.static('findByMobileNumber', function(name) {
  return this.find({ mobileNumber: name });
});

var User = mongoose.model('User', UserSchema);
module.exports = {
    User: User
}