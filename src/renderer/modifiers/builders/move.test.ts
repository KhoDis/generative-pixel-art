import { Figure } from "../../types.ts";
import { PixelMap } from "../../core/PixelMap.ts";
import move from "./move.ts";
import { point } from "../../factories";

describe("move", () => {
  it("should move a shape to a specified position", () => {
    const figure: Figure = { type: "shape", pixels: new PixelMap() };
    const result = move(figure, point(1, 2));
    expect(result).toEqual({
      type: "group",
      figures: [figure],
      anchor: { x: 1, y: 2 },
    });
  });
  it("should move a group to a specified position", () => {
    const figure: Figure = {
      type: "group",
      figures: [],
      anchor: { x: 0, y: 0 },
    };
    const result = move(figure, point(1, 2));
    expect(result).toEqual({
      type: "group",
      figures: [],
      anchor: { x: 1, y: 2 },
    });
  });
});
