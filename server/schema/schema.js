//! Schema def example 
const graphql = require('graphql');

//IMPORT TYPES
const {
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

//Create new types/objs
const UserType = new GraphQLObjectType({
    name : 'User', 
    description: 'Documentation goes here',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString} ,
        age: {type: GraphQLInt},
    })
})

//! IMPORTANT: ROOT QUERY
// * We have to tell GraphQL how our queries will be structured
// * ie, what to return
const RootQuery = new GraphQLObjectType(
    {
        name: 'RootQueryType',
        description: 'Root Query Definition',
        fields: {

            user: {
                type: UserType,
                //argument to use when we ask for a specific obj instance
                args: {id: {type: GraphQLString}},

                resolve(parent,args){
                    //we resolve with data
                    // ie, we fetch and return using the information provided
                    // think of it as an entry point to our graph/network

                    //get and return data from datasource / database

                    

                }
            }

        }
    }
);

//let the Schema be known to our app
module.exports = new GraphQLSchema(
    {query: RootQuery}
);