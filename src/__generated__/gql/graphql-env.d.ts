/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: "Query";
  mutation: "Mutation";
  subscription: never;
  types: {
    Boolean: unknown;
    CreateTaskInput: {
      kind: "INPUT_OBJECT";
      name: "CreateTaskInput";
      isOneOf: false;
      inputFields: [
        {
          name: "name";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "String"; ofType: null };
          };
          defaultValue: null;
        },
        {
          name: "projectId";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "ID"; ofType: null };
          };
          defaultValue: null;
        },
      ];
    };
    ID: unknown;
    Mutation: {
      kind: "OBJECT";
      name: "Mutation";
      fields: {
        createProject: {
          name: "createProject";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "Project"; ofType: null };
          };
        };
        createTask: {
          name: "createTask";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "OBJECT"; name: "Task"; ofType: null };
          };
        };
      };
    };
    Project: {
      kind: "OBJECT";
      name: "Project";
      fields: {
        id: {
          name: "id";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "ID"; ofType: null };
          };
        };
        name: {
          name: "name";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "String"; ofType: null };
          };
        };
        tasks: {
          name: "tasks";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: {
              kind: "LIST";
              name: never;
              ofType: {
                kind: "NON_NULL";
                name: never;
                ofType: { kind: "OBJECT"; name: "Task"; ofType: null };
              };
            };
          };
        };
      };
    };
    Query: {
      kind: "OBJECT";
      name: "Query";
      fields: {
        projects: {
          name: "projects";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: {
              kind: "LIST";
              name: never;
              ofType: {
                kind: "NON_NULL";
                name: never;
                ofType: { kind: "OBJECT"; name: "Project"; ofType: null };
              };
            };
          };
        };
        tasks: {
          name: "tasks";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: {
              kind: "LIST";
              name: never;
              ofType: {
                kind: "NON_NULL";
                name: never;
                ofType: { kind: "OBJECT"; name: "Task"; ofType: null };
              };
            };
          };
        };
      };
    };
    String: unknown;
    Task: {
      kind: "OBJECT";
      name: "Task";
      fields: {
        id: {
          name: "id";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "ID"; ofType: null };
          };
        };
        name: {
          name: "name";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "String"; ofType: null };
          };
        };
        projectId: {
          name: "projectId";
          type: {
            kind: "NON_NULL";
            name: never;
            ofType: { kind: "SCALAR"; name: "ID"; ofType: null };
          };
        };
      };
    };
  };
};

import * as gqlTada from "gql.tada";

declare module "gql.tada" {
  interface setupSchema {
    introspection: introspection;
  }
}
