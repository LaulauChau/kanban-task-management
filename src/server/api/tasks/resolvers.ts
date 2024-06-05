import type { Resolvers } from "~/__generated__/gql/server";
import type { Context } from "~/app/api/graphql/route";

const resolvers: Resolvers<Context> = {
  Query: {
    tasks: async (_, __, { db }) => {
      return db.task.findMany();
    },
  },
  Mutation: {
    createTask: async (_, { input }, { db }) => {
      const existingTask = await db.task.findFirst({
        where: { name: input.name },
      });

      if (existingTask) {
        throw new Error("Task already exists");
      }

      return db.task.create({ data: input });
    },
  },
};

export default resolvers;
