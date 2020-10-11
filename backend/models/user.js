require("../config/config.json");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

var userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  saltSecret: { type: String },
  resetLink:{data:String, default:''},
  newPassword:{type: String}
  
},{timestamps: true});

userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

//custome validation for email
userSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");



// methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, "secret#mysecret", {
    expiresIn: "20m",
  });
};

module.exports = mongoose.model("User", userSchema);
