'use strict';

const express = require('express');
const graphql = require('graphql');
const expressGraphql = require('express-graphql');

const router = express.Router();

//Standard mongoose schema we will use to make a db query from in our graphql resolvers;
const peopleSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
});
const People = mongoose.model('people', peopleSchema);

// Get some constants from graphQL (this is just some object deconstruction)
const {
  GraphQLObjectType, GraphQLString,
  GraphQLID, GraphQLSchema,
  GraphQLList, GraphQLNonNull,
} = graphql;


// Describe a person in graphQL Terms (feels repetitive)
// This replaces our BuildSchema finction call we were using before
const PeopleType = new GraphQLObjectType({
  name: 'People',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

// Describe the query types (person and people) and their resolvers (how we get the actual data)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    person: {
      type: PeopleType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return People.findById(args.id);
      },
    },
    people: {
      type: new GraphQLList(PeopleType),
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve(parent, args) {
        return People.find(args);
      },
    },
  },
});

// Describe the shape of the object for write ops
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPeople: {
      type: PeopleType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let person = new People({
          firstName: args.firstName,
          lastName: args.lastName,
          role: args.role,
        });
        return person.save();
      },
    },
  },
});

// As with all GraphQL Endpoints, create a schema, and start up a server with it.
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const graph = expressGraphql({
  schema: schema,
  graphiql: true,
});

router.use('/graphql', graph);

module.exports = router;