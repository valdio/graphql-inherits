import { mergeSchemas } from "@graphql-tools/schema";
import schema from "./schema";

export default mergeSchemas({
  schemas: [schema],
});
