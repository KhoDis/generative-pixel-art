import { Placement } from "../../types.ts";
import { PixelMap } from "../../core/PixelMap.ts";
import shape from "./shape.ts";

describe("shape", () => {
  it("should create a shape from a set of placements", () => {
    const placements: Placement[] = [
      { position: { x: 1, y: 1 }, pixel: { r: 0, g: 0, b: 0 } },
    ];
    const result = shape(placements);

    const pixels = new PixelMap();
    pixels.set({ x: 1, y: 1 }, { r: 0, g: 0, b: 0 });
    expect(result).toEqual({ type: "shape", pixels });
  });
});
