import resolvers from "../resolvers";

describe("projects resolvers", async () => {
  const mockDb = {
    project: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Query.projects", async () => {
    it("should return all projects", async () => {
      const projects = [{ id: "1", name: "Project 1", tasks: [] }];
      mockDb.project.findMany.mockResolvedValue(projects);

      // @ts-ignore
      const result = await resolvers.Query.projects(null, null, { db: mockDb });

      expect(result).toEqual(projects);
      expect(mockDb.project.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return all projects with tasks", async () => {
      const projects = [
        { id: "1", name: "Project 1", tasks: [{ id: "1", name: "Task 1" }] },
      ];
      mockDb.project.findMany.mockResolvedValue(projects);

      // @ts-ignore
      const result = await resolvers.Query.projects(null, null, { db: mockDb });

      expect(result).toEqual(projects);
      expect(mockDb.project.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array if no projects are found", async () => {
      mockDb.project.findMany.mockResolvedValue([]);

      // @ts-ignore
      const result = await resolvers.Query.projects(null, null, { db: mockDb });

      expect(result).toEqual([]);
      expect(mockDb.project.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mutation.createProject", async () => {
    it("should create a project", async () => {
      const project = { id: 1, name: "Project 1", tasks: [] };
      mockDb.project.findFirst.mockResolvedValue(null);
      mockDb.project.create.mockResolvedValue(project);

      // @ts-ignore
      const result = await resolvers.Mutation.createProject(
        null,
        { name: "Project 1" },
        { db: mockDb },
      );

      expect(result).toEqual(project);
      expect(mockDb.project.findFirst).toHaveBeenCalledTimes(1);
      expect(mockDb.project.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the project already exists", async () => {
      mockDb.project.findFirst.mockResolvedValue({ id: 1, name: "Project 1" });

      try {
        // @ts-ignore
        await resolvers.Mutation.createProject(
          null,
          { name: "Project 1" },
          { db: mockDb },
        );
      } catch (error) {
        expect(error).toEqual(new Error("Project already exists"));
        expect(mockDb.project.findFirst).toHaveBeenCalledTimes(1);
        expect(mockDb.project.create).toHaveBeenCalledTimes(0);
      }
    });
  });
});
