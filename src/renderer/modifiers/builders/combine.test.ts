import { Figure } from "../../types.ts";
import { PixelMap } from "../../core/PixelMap.ts";
import combine from "./combine.ts";

describe("combine", () => {
  it("should combine multiple figures into a group", () => {
    const figures: Figure[] = [
      { type: "shape", pixels: new PixelMap() },
      { type: "group", figures: [], anchor: { x: 0, y: 0 } },
    ];
    const result = combine(...figures);
    expect(result).toEqual({
      type: "group",
      figures,
      anchor: { x: 0, y: 0 },
    });
  });
});
