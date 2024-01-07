import point from "./point.ts";

describe("point", () => {
  it("should create a point", () => {
    const result = point(1, 2);
    expect(result).toEqual({ x: 1, y: 2 });
  });
});
