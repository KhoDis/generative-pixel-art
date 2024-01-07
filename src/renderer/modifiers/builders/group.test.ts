import { Figure } from "../../types.ts";
import { PixelMap } from "../../core/PixelMap.ts";
import group from "./group.ts";
import { point } from "../../factories";

describe("group", () => {
  it("should group figures at a specified position", () => {
    const figures: Figure[] = [
      { type: "shape", pixels: new PixelMap() },
      { type: "group", figures: [], anchor: { x: 0, y: 0 } },
    ];
    const result = group(figures, point(1, 2));
    expect(result).toEqual({
      type: "group",
      figures,
      anchor: { x: 1, y: 2 },
    });
  });
});
