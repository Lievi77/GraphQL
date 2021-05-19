//Class that 'models' represents an user in MongoDB

const mongoose = require("mongoose");
const MSchema = mongoose.Schema;

const userSchema = new MSchema({
  //must follow same schema structure as for GraphQL
  //id is not required to be explicitly defined, MongoDB assigns id automatically
  name: String,
  age: Number,
  profession: String,
});

module.exports = mongoose.model("User", userSchema);
