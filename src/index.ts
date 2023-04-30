import { mapSchema, MapperKind } from "@graphql-tools/utils";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";
import { getFieldConfig } from "./utils";

// This function takes in a schema and adds inherits directives to all types
// the specified name (we're using `inherits`)
function inheritDirective(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_TYPE]: (fieldConfig) => {
      return getFieldConfig<GraphQLObjectType>(
        schema,
        directiveName,
        fieldConfig
      );
    },
    [MapperKind.INPUT_OBJECT_TYPE]: (fieldConfig) => {
      return getFieldConfig<GraphQLInputObjectType>(
        schema,
        directiveName,
        fieldConfig
      );
    },
  });
}

export default inheritDirective;
