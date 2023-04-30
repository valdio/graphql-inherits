import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";

type BaseType = GraphQLObjectType | GraphQLInputObjectType;

export function getFieldConfig<T extends BaseType>(
  schema: GraphQLSchema,
  directiveName: string,
  fieldConfig: BaseType
) {
  // Check whether this field has the specified directive
  const directive = getDirective(schema, fieldConfig, directiveName)?.[0];
  if (directive) {
    const { type } = directive;
    const fields = fieldConfig.getFields();
    const baseType = schema.getTypeMap()[type] as T;
    Object.entries(baseType.getFields()).forEach(([name, field]) => {
      if (fields[name] === undefined) {
        fields[name] = { ...field };
      }
    });

    return fieldConfig as T;
  }
}
