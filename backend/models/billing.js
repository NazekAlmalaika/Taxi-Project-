var mongoose = require("mongoose");
var BillingMethodSchema = require("./billingMethod").BillingMethodSchema;
var options = {timestamps: true};

var BillingSchema = new mongoose.Schema({
     amount: {type: mongoose.Schema.Types.Number},
     currency: {type: mongoose.Schema.Types.String},
     paid: {type: mongoose.Schema.Types.Boolean},
     //billingMethod: { type: BillingMethodSchema } 
     billingMethod_id: {type: mongoose.Schema.Types.String} 
  }, options);



var Billing = mongoose.model('Billing', BillingSchema);
module.exports = {
  Billing: Billing,
  BillingSchema: BillingSchema
}