import resolvers from "../resolvers";

describe("tasks resolvers", async () => {
  const mockDb = {
    task: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Query.tasks", async () => {
    it("should return all tasks", async () => {
      const tasks = [{ id: "1", name: "Task 1" }];
      mockDb.task.findMany.mockResolvedValue(tasks);

      // @ts-ignore
      const result = await resolvers.Query.tasks(null, null, { db: mockDb });

      expect(result).toEqual(tasks);
      expect(mockDb.task.findMany).toHaveBeenCalledTimes(1);
    });

    it("should return an empty array if no tasks are found", async () => {
      mockDb.task.findMany.mockResolvedValue([]);

      // @ts-ignore
      const result = await resolvers.Query.tasks(null, null, { db: mockDb });

      expect(result).toEqual([]);
      expect(mockDb.task.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mutation.createTask", async () => {
    it("should create a task", async () => {
      const task = { id: "1", name: "Task 1" };
      mockDb.task.findFirst.mockResolvedValue(null);
      mockDb.task.create.mockResolvedValue(task);

      // @ts-ignore
      const result = await resolvers.Mutation.createTask(
        null,
        { input: { name: "Task 1" } },
        { db: mockDb },
      );

      expect(result).toEqual(task);
      expect(mockDb.task.findFirst).toHaveBeenCalledTimes(1);
      expect(mockDb.task.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if the task already exists", async () => {
      mockDb.task.findFirst.mockResolvedValue({ id: "1", name: "Task 1" });

      await expect(
        // @ts-ignore
        resolvers.Mutation.createTask(
          null,
          { input: { name: "Task 1" } },
          { db: mockDb },
        ),
      ).rejects.toThrow("Task already exists");

      expect(mockDb.task.findFirst).toHaveBeenCalledTimes(1);
      expect(mockDb.task.create).toHaveBeenCalledTimes(0);
    });
  });
});
