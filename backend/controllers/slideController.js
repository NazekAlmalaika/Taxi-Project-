"use strict";
// Node Modules
const bcrypt = require("bcrypt");


module.exports = function(SliderSchema) {
  // Auth hooks
  UserSchema.pre("save", async function() {
    // Here I check if the document is new and then user bcrypt to has the password
    if (this.isNew) {
      try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
      } catch (err) {
        console.log(err);
      }
    }
  });
};