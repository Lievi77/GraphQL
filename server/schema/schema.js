//! Schema def example
const graphql = require("graphql");
const _ = require("lodash");

// ? Dummy Data Def

let usersData = [
  { id: "1", name: "Emily", age: 29, profession: "Sandwich Artist" },
  { id: "11", name: "Emily2", age: 39, profession: "Barista" },
  { id: "12", name: "Emily3", age: 49, profession: "Data Scientist" },
  { id: "13", name: "Emily4", age: 59, profession: "Streamer" },
  { id: "14", name: "Emily5", age: 69, profession: "Gamer" },
];

let dogData = [
  { id: "2", name: "Kipe", age: 10, breed: "Dachschund" },
  { id: "21", name: "Gala", age: 5, breed: "Dachschund" },
  { id: "22", name: "Yellow", age: 5, breed: "Chihuahua" },
  { id: "23", name: "Canela", age: 5, breed: "Chihuahua" },
  { id: "24", name: "Manning", age: 12, breed: "Chihuahua" },
];

let hobbyData = [
  { id: "3", title: "Basketball", description: "Hoops" },
  { id: "31", title: "Baseball", description: "Ball" },
  { id: "32", title: "Coding", description: "Programming" },
  { id: "33", title: "Cooking", description: "Eating" },
  { id: "34", title: "Surfing", description: "Sharks" },
];

let postData = [
  { id: "4", comment: " I am awesom42323423e" },
  { id: "41", comment: " I am awesome5435243" },
  { id: "42", comment: " I am awesome243423" },
  { id: "43", comment: " I am awesome433243" },
  { id: "44", comment: " I am awesome677" },
];

// ? Dummy Data def end

//IMPORT TYPES
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// ? Create new types/objs
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation goes here",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const DogType = new GraphQLObjectType({
  name: "Dog",
  description: "A good boy/girl",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobbies for our persons",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "A random piece of text",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  }),
});
//? end of type definition

//! IMPORTANT: ROOT QUERY
// * We have to tell GraphQL how our queries will be structured
// * ie, what to return
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query Definition",
  fields: {
    user: {
      type: UserType,
      //argument to use when we ask for a specific obj instance
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        //we resolve with data
        // ie, we fetch and return using the information provided
        // think of it as an entry point to our graph/network

        //get and return data from datasource / database

        //! To query obj users we will use the Lodash module
        //* the second argument for find() is the args provided.
        return _.find(usersData, { id: args.id });
      },
    },
    dog: {
      type: DogType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dogData, { id: args.id });
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },
  },
});

//let the Schema be known to our app
module.exports = new GraphQLSchema({ query: RootQuery });
