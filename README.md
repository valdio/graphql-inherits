# graphql-inherits

Graphql inheritance directive for types and input objects.

## Usage

Integrate the `inherits` directive with your GraphQL schema.

```ts
import { mergeSchemas } from "@graphql-tools/schema";
import inheritDirective from "graphql-inherits";

const schema = mergeSchemas({
  // ...
});

const updatedSchema = inheritDirective(schema, "inherits");

const server = new ApolloServer({
  schema: updatedSchema,
  // ... the rest of the server config
});
```

Use the `inherits` directive to define a type or input object that inherits from another type or input object.

```ts
    // <!-- GraphQLObjectType example -->
    type Pet {
        id: ID
        name: String
        age: Int
    }

    type Dog @inherits(type: "Pet") {
        breed: String
    }

    // <!-- GraphQLInputObjectType example -->
    input PetInput  {
        name: String
        age: Int
    }

    input DogInput @inherits(input: "PetInput") {
        breed: String
    }
```
