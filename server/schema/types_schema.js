const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = require("graphql");
const _ = require("lodash");

//Type, Scalars
/* 
String
int
Float
Boolean
ID 
*/

const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "A regular person",
  fields: () => ({
    id: { type: GraphQLID }, //each field has to have a type
    // but what if one of the fields cannot be null?
    //A: GraphQLNonNull()
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: new GraphQLNonNull(GraphQLFloat) },

    // ! We can create types inside of types
    justAType: {
      type: PersonType,
      resolve(parent, args) {
        return parent; //returns the outer type
      },
    },
    // ! we can put any number of types inside fields
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Dummy Root Query",
  fields: {
    person: {
      type: PersonType,
      resolve(parent, args) {
        let person = {
          id: 1,
          name: "Antonio",
          age: 35,
          isMarried: true,
          gpa: 4.0,
        };
        return person;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
