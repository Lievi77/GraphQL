//! Schema def example
const graphql = require("graphql");
const _ = require("lodash");
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Dog = require("../model/dog");
const Post = require("../model/post");
// ? Dummy Data Def

let usersData = [
  { id: "1", name: "Emily", age: 29, profession: "Sandwich Artist" },
  { id: "11", name: "Emily2", age: 39, profession: "Barista" },
  { id: "12", name: "Emily3", age: 49, profession: "Data Scientist" },
  { id: "13", name: "Emily4", age: 59, profession: "Streamer" },
  { id: "14", name: "Emily5", age: 69, profession: "Gamer" },
];

let dogData = [
  { id: "2", name: "Kipe", age: 10, breed: "Dachschund", userID: "1" },
  { id: "21", name: "Gala", age: 5, breed: "Dachschund", userID: "11" },
  { id: "22", name: "Yellow", age: 5, breed: "Chihuahua", userID: "12" },
  { id: "23", name: "Canela", age: 5, breed: "Chihuahua", userID: "13" },
  { id: "24", name: "Manning", age: 12, breed: "Chihuahua", userID: "14" },
];

let hobbyData = [
  { id: "3", title: "Basketball", description: "Hoops", userID: "1" },
  { id: "31", title: "Baseball", description: "Ball", userID: "11" },
  { id: "32", title: "Coding", description: "Programming", userID: "12" },
  { id: "33", title: "Cooking", description: "Eating", userID: "13" },
  { id: "34", title: "Surfing", description: "Sharks", userID: "14" },
];

let postData = [
  //userID shows relationship
  { id: "4", comment: " I am awesom42323423e", userID: "1" },
  { id: "41", comment: " I am awesome5435243", userID: "1" },
  { id: "42", comment: " I am awesome243423", userID: "12" },
  { id: "43", comment: " I am awesome433243", userID: "13" },
  { id: "44", comment: " I am awesome677", userID: "14" },
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
        return _.filter(postData, { userID: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbyData, { userID: parent.id });
      },
    },
  }),
});

/*
! Pro Tip: Many relationship -> _.filter()
!          One relationship -> _.find() 
*/

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
        return _.find(usersData, parent.userID);
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
        return _.find(usersData, { id: parent.userID });
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
        return _.find(usersData, { id: parent.userID });
      },
    },
  }),
});
//? end of objts type definition

//! IMPORTANT: ROOT QUERY
// * We have to tell GraphQL how our queries will be structured
// * ie, what to return
// * Think of it as an entry point to our graph/network
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

    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return usersData; // Note that we do not apply _.filter()
      },
    },

    dog: {
      type: DogType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(dogData, { id: args.id });
      },
    },

    dogs: {
      type: new GraphQLList(DogType),
      resolve(parent, args) {
        return dogData;
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbyData, { id: args.id });
      },
    },

    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return hobbyData;
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(postData, { id: args.id });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postData;
      },
    },
  },
});

//! MUTATIONS

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //* Think of the next definition as a method that creates a new instance
    //! Notice that these methods/queries only create instances LOCALLY
    createUser: {
      type: UserType,
      args: {
        //id: { type: GraphQLID }
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession,
        };
        return user;
      },
    },
    createPost: {
      type: PostType,
      args: {
        //id: {type: GraphQLID},
        comment: { type: GraphQLString },
        userID: { type: GraphQLID },
      },
      resolve(parent, args) {
        let post = { comment: args.comment, userID: args.userID };
        return post;
      },
    },
    createHobby: {
      type: HobbyType,
      args: {
        //! Try to make the arguments the same as the object definition
        //id: {type: GraphQLID},
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userID: { type: GraphQLID },
      },
      resolve(parent, args) {
        let hobby = {
          title: args.title,
          description: args.description,
          userID: args.userID,
        };

        return hobby;
      },
    },
  },
});

//let the Schema be known to our app
// Must pass mutation to GraphQLSchema
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
