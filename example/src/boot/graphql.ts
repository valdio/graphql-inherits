import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import inheritDirective from "graphql-inherits";
import schema from "../schema";

let updatedSchema = inheritDirective(schema, "inherits");

const server = new ApolloServer({
  schema: updatedSchema,
  debug: process.env.NODE_ENV === "development",
  introspection: process.env.APP_ENV !== "production",
  // playground: process.env.APP_ENV !== "production",
  // formatError: (error) => {
  //   const errorBody = error?.extensions?.response?.body;
  //   if (error?.extensions && errorBody)
  //     error.extensions.response.body = mapObjectToCamelCase(errorBody);
  //   return error;
  // },
});

export default async (app: Application) => {
  await server.start();

  server.applyMiddleware({ app });
  return server.graphqlPath;
};
