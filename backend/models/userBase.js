var mongoose = require("mongoose");
var options = {discriminatorKey: 'kind'};

var UserBaseSchema = new mongoose.Schema({
    created :{ type: mongoose.Schema.Types.String},
    updated :{ type: mongoose.Schema.Types.String},
    createdBy: { type: mongoose.Schema.Types.String},
    active: { type: mongoose.Schema.Types.Boolean},
    name :{ type: mongoose.Schema.Types.String},
    password: { type: mongoose.Schema.Types.String, index: true, unique: true },
    mobileNumber: { type: mongoose.Schema.Types.Number},
  }, options);

var UserBase = mongoose.model('mObject', UserBaseSchema);
module.exports = {
  UserBase: UserBase,
  UserBaseSchema: UserBaseSchema,
  defaultOptions: options
}
