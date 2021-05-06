const express = require('express'); 
const {graphqlHTTP} = require('express-graphql');

const app = express();

//.use lets us pass an endpoint.
app.use('/graphql', graphqlHTTP({
    //ie, we see the graphiql playground 
    graphiql: true
}) );


app.listen(4000, () => { //usually located it localhost:PORTNUMBER
    console.log('Listening for requests ');
});