const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  contacted_by: [
    {
      type: String,
      enum: ["SMS", "Email"],
    },
  ],
  item_id: { type: Schema.Types.ObjectId, ref: "Item" },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
