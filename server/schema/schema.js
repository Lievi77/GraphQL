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
  { id: "2", name: "Kipe", age: 10, breed: "Dachschund", userid: "1" },
  { id: "21", name: "Gala", age: 5, breed: "Dachschund", userid: "11" },
  { id: "22", name: "Yellow", age: 5, breed: "Chihuahua", userid: "12" },
  { id: "23", name: "Canela", age: 5, breed: "Chihuahua", userid: "13" },
  { id: "24", name: "Manning", age: 12, breed: "Chihuahua", userid: "14" },
];

let hobbyData = [
  { id: "3", title: "Basketball", description: "Hoops", userid: "1" },
  { id: "31", title: "Baseball", description: "Ball", userid: "11" },
  { id: "32", title: "Coding", description: "Programming", userid: "12" },
  { id: "33", title: "Cooking", description: "Eating", userid: "13" },
  { id: "34", title: "Surfing", description: "Sharks", userid: "14" },
];

let postData = [
  //userid shows relationship
  { id: "4", comment: " I am awesom42323423e", userid: "1" },
  { id: "41", comment: " I am awesome5435243", userid: "1" },
  { id: "42", comment: " I am awesome243423", userid: "12" },
  { id: "43", comment: " I am awesome433243", userid: "13" },
  { id: "44", comment: " I am awesome677", userid: "14" },
];

// ? Dummy Data def end

//IMPORT TYPES
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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
    //? But what if happens if we want all posts created/related to a user?
    // ? A: We use the GraphQLList type
    //! Note that it is post*s*, plural. Since we are returning numerous instances
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        //type of parent is UserType

        return _.filter(postData, { userid: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbyData, { userid: parent.id });
      },
    },
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
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, parent.userid);
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobbies for our persons",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    //note how user goes inside the fields method
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, { id: parent.userid });
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "A random piece of text",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    //Object Types can also have a resolve method
    user: {
      type: UserType,
      //this resolve method is to map relationships
      resolve(parent, args) {
        //parent, in this case, is PostType
        // Look how Post Instances are defined in our db
        return _.find(usersData, { id: parent.userid });
      },
    },
  }),
});
//? end of objts type definition

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
