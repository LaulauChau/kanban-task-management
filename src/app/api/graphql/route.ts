import { join } from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { createSchema, createYoga } from "graphql-yoga";

import { db } from "~/server/db";

export type Context = {
  db: typeof db;
};

const resolversPath = join(
  process.cwd(),
  "src/server/api/**/resolvers.{js,ts}",
);
const typeDefsPath = join(process.cwd(), "schema.graphql");

const resolvers = loadFilesSync(resolversPath);
const typeDefs = loadFilesSync(typeDefsPath);

const { handleRequest } = createYoga<Context>({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),

  graphqlEndpoint: "/api/graphql",

  fetchAPI: { Response },

  context: { db },
});

export {
  handleRequest as GET,
  handleRequest as OPTIONS,
  handleRequest as POST,
};
