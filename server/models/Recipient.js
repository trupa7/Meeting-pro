const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Recipient name is required"]
  },
  email: {
    type: String,
    required: [true, "Recipient email address is required"]
  }
});

Recipient = mongoose.model("Recipient", RecipientSchema);
module.exports = Recipient;
