var mongoose = require("mongoose");
var options = {timestamps: true};

var BillingMethodSchema = new mongoose.Schema({
     biilingType: {type: mongoose.Schema.Types.String},
     verified: {type: mongoose.Schema.Types.Boolean} 
  }, options);



var BillingMethod = mongoose.model('BillingMethod', BillingMethodSchema);
module.exports = {
  BillingMethod: BillingMethod,
  BillingMethodSchema: BillingMethodSchema
}