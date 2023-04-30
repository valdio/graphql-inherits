import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs } from "@graphql-tools/merge";

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    gql`
      type Pet {
        id: ID
        name: String
        age: Int
      }

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

// type Dog @inherits(type: "Pet") {
//   breed: String
// }

// input PetInput {
//   name: String
//   age: Int
// }

// input DogInput @inherits(input: "PetInput") {
//   breed: String
// }

// directive @inherits(type: String!) on OBJECT | INPUT_OBJECT
