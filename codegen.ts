import type { CodegenConfig } from "@graphql-codegen/cli";

const config = {
  schema: "./schema.graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__generated__/gql/server.ts": {
      config: {
        useTypeImports: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
} satisfies CodegenConfig;

export default config;
