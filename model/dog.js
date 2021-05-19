const mongoose = require("mongoose");
const Mschema = mongoose.Schema;

const dogSchema = new Mschema({
  name: String,
  breed: String,
  age: Number,
  userID: String,
});

module.exports = mongoose.model("Dog", dogSchema);
