import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";

// This function takes in a schema and adds inherits directives to all types
// the specified name (we're using `inherits`)
function inheritDirective(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_TYPE]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (directive) {
        const { type } = directive;
        const fields = fieldConfig.getFields();
        const baseType = schema.getTypeMap()[type] as GraphQLObjectType;
        Object.entries(baseType.getFields()).forEach(([name, field]) => {
          if (fields[name] === undefined) {
            fields[name] = { ...field };
          }
        });

        return fieldConfig;
      }
    },
    [MapperKind.INPUT_OBJECT_TYPE]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (directive) {
        const { type } = directive;
        const fields = fieldConfig.getFields();
        const baseType = schema.getTypeMap()[type] as GraphQLInputObjectType;
        Object.entries(baseType.getFields()).forEach(([name, field]) => {
          if (fields[name] === undefined) {
            fields[name] = { ...field };
          }
        });

        return fieldConfig;
      }
    },
  });
}

export default inheritDirective;
