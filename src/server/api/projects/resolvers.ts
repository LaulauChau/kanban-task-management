import type { Resolvers } from "~/__generated__/gql/server";
import type { Context } from "~/app/api/graphql/route";

const resolvers: Resolvers<Context> = {
  Query: {
    projects: async (_, __, { db }) => {
      return db.project.findMany({ include: { tasks: true } });
    },
  },
  Mutation: {
    createProject: async (_, { name }, { db }) => {
      const existingProject = await db.project.findFirst({ where: { name } });

      if (existingProject) {
        throw new Error("Project already exists");
      }

      return db.project.create({ data: { name }, include: { tasks: true } });
    },
  },
};

export default resolvers;
