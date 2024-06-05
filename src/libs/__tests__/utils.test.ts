import { excludeFields } from "../utils";

describe("excludeFields", () => {
  it("should exclude specified fields from the object", () => {
    const obj: Record<string, unknown> = {
      id: 1,
      name: "John",
      age: 30,
      email: "john@example.com",
    };

    const result = excludeFields(obj, ["name", "email"]);

    expect(result).toEqual({ id: 1, age: 30 });
  });

  it("should return the same object if no fields are specified", () => {
    const obj: Record<string, unknown> = {
      id: 1,
      name: "John",
      age: 30,
      email: "john@example.com",
    };

    const result = excludeFields(obj, []);

    expect(result).toEqual(obj);
  });

  it("should handle empty object correctly", () => {
    const obj: Record<string, unknown> = {};

    const result = excludeFields(obj, ["name", "email"]);

    expect(result).toEqual({});
  });
});
