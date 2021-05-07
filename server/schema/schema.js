//! Schema def example 
const graphql = require('graphql');
const _ = require('lodash');

// ? Dummy Data Def

let usersData = [

    {id: '1', name : 'Emily', age: 29, profession : "Sandwich Artist"},
    {id: '11', name : 'Emily2', age: 39, profession: "Barista"},
    {id: '12', name : 'Emily3', age: 49, profession: "Data Scientist"},
    {id: '13', name : 'Emily4', age: 59, profession : "Streamer"},
    {id: '14', name : 'Emily5', age: 69, profession: "Gamer"},

];

let dogData = [
    {id: '2', name: 'Kipe', age: 10, breed:'Dachschund'},
    {id: '21', name: 'Gala', age: 5, breed:'Dachschund'},
    {id: '22', name: 'Yellow', age: 5, breed:'Chihuahua'},
    {id: '23', name: 'Canela', age: 5, breed:'Chihuahua'},
    {id: '24', name: 'Manning', age: 12, breed:'Chihuahua'},

];

// ? Dummy Data def end


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
        profession : {type: GraphQLString}
    })
})

const DogType = new GraphQLObjectType({
    name: "Dog",
    description: "A good boy/girl",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        breed : {type: GraphQLString},
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

                    //! To query obj users we will use the Lodash module
                    //* the second argument for find() is the args provided.
                    return _.find(usersData , {id: args.id })

                }
            },
            dog: {
                type: DogType,
                args: {id: {type: GraphQLString}},
                resolve(parent,args){
                    return _.find(dogData, {id: args.id})
                }

            }

        }
    }
);

//let the Schema be known to our app
module.exports = new GraphQLSchema(
    {query: RootQuery}
);