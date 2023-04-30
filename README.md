# graphql-inherits

Graphql inheritance directive for types and input objects.

[![npm package](https://img.shields.io/badge/npm-package-3FB950.svg)](https://www.npmjs.com/package/graphql-inherits)

## Installation

```bash
$ yarn add graphql-inherits

# this package has the following peer dependencies:
# - graphql
# - @graphql-tools/utils
```

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
    // <!-- Declare directive -->
    directive @inherits(type: String!) on OBJECT | INPUT_OBJECT

   // --------------------------------------------------------

    // <!-- GraphQLObjectType example -->
    type Pet {
        id: ID
        name: String
        age: Int
    }

    type Dog @inherits(type: "Pet") {
        breed: String
    }

  // --------------------------------------------------------

    // <!-- GraphQLInputObjectType example -->
    input PetInput  {
        name: String
        age: Int
    }

    input DogInput @inherits(type: "PetInput") {
        breed: String
    }

   // --------------------------------------------------------

    // <!-- Cross types are also permitted. -->
    // For example from Object to Input type:

    type UserBase {
        name: String
        age: Int
    }
    input UserInput @inherits(type: "UserBase") {
        email: String!
    }

```

### [License](./LICENSE)

```

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
