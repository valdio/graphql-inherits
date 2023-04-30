import { getDirective } from "@graphql-tools/utils";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  InputObjectTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ConstDirectiveNode,
  StringValueNode,
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
    // current type files
    const fields = fieldConfig.getFields();
    const nestedASTs = collectNestedASTs<T>(schema, type, directiveName);
    const types = nestedASTs.map((t) => schema.getTypeMap()[t] as T);
    types.forEach((objType) => {
      Object.entries(objType.getFields()).forEach(([name, field]) => {
        if (fields[name] === undefined) {
          fields[name] = { ...field };
        }
      });
    });
    return fieldConfig as T;
  }
}

/**
 *  Method to get the nested Types in the syntax tree.
 * @param schema
 * @param type Graphql type to lookup
 * @param directiveName
 * @returns Array of strings with the chained types.
 */
function collectNestedASTs<T extends BaseType>(
  schema: GraphQLSchema,
  type: string,
  directiveName: string
): string[] {
  const baseType = schema.getTypeMap()[type] as T;
  //   check the Abstract Syntax Tree for inheritances.
  const directive = filterInterestedDirectives(directiveName, baseType.astNode);
  const nestedType = directive?.arguments?.map(
    (arg) => (arg.value as StringValueNode)?.value
  );

  // end recursive lookup
  if (!nestedType || nestedType.length === 0) return [type];

  return [type].concat(
    ...nestedType.map((t) => collectNestedASTs(schema, t, directiveName))
  );
}

/**
 * Filter the Abstract Syntax Tree (AST) for inheritance directives.
 * @param directiveName Specified directive name
 * @param astNode Current type Abstract Syntax Tree
 * @returns inheritance Directive
 */
function filterInterestedDirectives(
  directiveName: string,
  astNode?:
    | InputObjectTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | null
    | undefined
): ConstDirectiveNode | undefined {
  return astNode?.directives?.find(
    (directive) => directive.name.value === directiveName
  );
}
