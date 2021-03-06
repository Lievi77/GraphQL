const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose"); //for mongoDB connection
require("dotenv").config(); //loads .env credentials on process.env

//console.log(process.env.MONGODB_USERNAME);
const mongo_cluster_url = `mongodb+srv://levi-master:bnqLxQzbC6ioGHjd@gql-cluster-sandbox.yfdby.mongodb.net/gql-cluster-sandbox?retryWrites=true&w=majority`;

const cors = require("cors"); //! for security reasons

const port = process.env.PORT || 4000;

mongoose.connect(
  mongo_cluster_url,
  //! added useFindAndModify = false to avoid deprecation warnings
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false } // removes deprecated warnings
);
mongoose.connection.once("open", () => {
  console.log("Connection successful");
});
//make our schema be known/inferred to our app
const schema = require("./schema/schema"); //no need to add .js
const testSchema = require("./schema/types_schema");

const app = express();

app.use(cors());
//.use lets us pass an endpoint.
app.use(
  "/graphql",

  graphqlHTTP({
    //ie, we see the graphiql playground
    graphiql: true,
    schema: schema, //ES6 syntax
  })
);

app.listen(port, () => {
  //usually located it localhost:PORTNUMBER

  console.log("Listening for requests");
});
