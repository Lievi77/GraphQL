const mongoose = require("mongoose");
const Mschema = mongoose.Schema;

const hobbySchema = new Mschema({
  title: String,
  description: String,
  userID: String, //need this so we can relate users to hobbies
});

module.exports = mongoose.model("Hobby", hobbySchema);
