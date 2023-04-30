import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs } from "@graphql-tools/merge";

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    gql`
      directive @inherits(type: String!) on OBJECT | INPUT_OBJECT

      """
      ---------------------------------------------------------------
      Type definitions.
      ---------------------------------------------------------------
      """
      type Pet {
        id: ID
        name: String
        age: Int
      }

      type Dog @inherits(type: "Pet") {
        breed: String
      }

      type Poodle @inherits(type: "Dog") {
        hairLength: Int
        age: Float
      }

      type MyAwesomePoodle @inherits(type: "Poodle") {
        awesomeName: String
      }

      """
      ---------------------------------------------------------------
      Input definitions.
      ---------------------------------------------------------------
      """
      input PetInput {
        name: String
        age: Int
      }

      input DogInput @inherits(type: "PetInput") {
        breed: String
      }

      input PoodleInput @inherits(type: "DogInput") {
        hairLength: Int
      }

      """
      ---------------------------------------------------------------
      Cross type inherits
      ---------------------------------------------------------------
      """
      type UserBase {
        name: String
        age: Int
      }
      input UserInput @inherits(type: "UserBase") {
        email: String!
      }

      """
      ---------------------------------------------------------------
      """
      type Status {
        status: String
      }

      type Query {
        test: Status
      }
    `,
  ]),
  resolvers: {
    Query: {
      test: async (root, { payload }) => {
        return { status: "active" };
      },
    },
  },
});
