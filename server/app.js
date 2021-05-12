const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose"); //for mongoDB connection
require("dotenv").config(); //loads .env credentials on process.env

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gql-cluster-sandbox.yfdby.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true } // removes deprecated warnings
);
mongoose.connection.once("open", () => {
  console.log("Connection successful");
});
//make our schema be known/inferred to our app
const schema = require("./schema/schema"); //no need to add .js
const testSchema = require("./schema/types_schema"); //no need to add .js

const app = express();

//.use lets us pass an endpoint.
app.use(
  "/graphql",
  graphqlHTTP({
    //ie, we see the graphiql playground
    graphiql: true,
    schema: testSchema, //ES6 syntax
  })
);

app.listen(4000, () => {
  //usually located it localhost:PORTNUMBER
  console.log("Listening for requests");
});
