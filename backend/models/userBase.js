var mongoose = require("mongoose");
var BillingMethodSchema = require("./billingMethod").BillingMethodSchema;
var BillingSchema = require("./billing").BillingSchema;
var BookingSchema = require("./booking").BookingSchema;
var options = {discriminatorKey: 'kind',  timestamps: true};

var UserBaseSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.String},
    active: { type: mongoose.Schema.Types.Boolean},
    name :{ type: mongoose.Schema.Types.String},
    password: { type: mongoose.Schema.Types.String },
    mobileNumber: { type: mongoose.Schema.Types.Number,index: true, unique: true},
    email:{type: mongoose.Schema.Types.String},
    region: {type: mongoose.Schema.Types.String},
    onilne: {type: mongoose.Schema.Types.Boolean},
    address: {type: mongoose.Schema.Types.String},
    billing: {type: BillingSchema},
    billingMethod: [BillingMethodSchema],
    bookings: [BookingSchema],
    defaultBillingMethod : {type: BillingMethodSchema}
  }, options);

var UserBase = mongoose.model('UserBase', UserBaseSchema);
module.exports = {
  UserBase: UserBase,
  UserBaseSchema: UserBaseSchema,
  defaultOptions: options
}
