const express = require("express");
const { graphqlHTTP } = require("express-graphql");

//make our schema be known/inferred to our app
const schema = require("./schema/schema"); //no need to add .js

const app = express();

//.use lets us pass an endpoint.
app.use(
  "/graphql",
  graphqlHTTP({
    //ie, we see the graphiql playground
    graphiql: true,
    schema, //ES6 syntax
  })
);

app.listen(4000, () => {
  //usually located it localhost:PORTNUMBER
  console.log("Listening for requests");
});
