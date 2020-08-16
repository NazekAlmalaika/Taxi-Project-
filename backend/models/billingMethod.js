var mongoose = require("mongoose");
var options = {timestamps: true};

var BillingMethodSchema = new mongoose.Schema({
     paymentMethod: {type: mongoose.Schema.Types.String},
     verified: {type: mongoose.Schema.Types.Boolean}, 
     active: {type: mongoose.Schema.Types.Boolean},
     user_id : {type: mongoose.Schema.Types.String}
  }, options);



var BillingMethod = mongoose.model('BillingMethod', BillingMethodSchema);
module.exports = {
  BillingMethod: BillingMethod,
  BillingMethodSchema: BillingMethodSchema
}