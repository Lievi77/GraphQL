const mongoose = require("mongoose");
const Mschema = mongoose.Schema;

const postSchema = new Mschema({
  comment: String,
  userID: String,
});

module.exports = mongoose.model("Post", postSchema);
