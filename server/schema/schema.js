//! Schema def example 
const graphql = require('graphql');

//IMPORT TYPES
const {
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString,
    GraphQLInt
} = graphql


//Create new types/objs
const UserTypes = new GraphQLObjectType({
    name : 'User', 
    description: 'Documentation goes here',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString} ,
        age: {type: GraphQLInt},
    })
})