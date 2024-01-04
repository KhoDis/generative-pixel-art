import { Figure, Point } from "../types.ts";
import { PixelMap } from "./PixelMap.ts";
import { group, shape } from "./primitives.ts";

describe("primitives", () => {
  describe("group", () => {
    it("should group figures at a specified position", () => {
      const figures: Figure[] = [
        { type: "shape", pixels: new PixelMap() },
        { type: "group", figures: [], anchor: { x: 0, y: 0 } },
      ];
      const anchor: Point = { x: 1, y: 2 };
      const result = group(figures, anchor);
      expect(result).toEqual({ type: "group", figures, anchor });
    });
    it("should group figures at 0, 0 if no position is specified", () => {
      const figures: Figure[] = [
        { type: "shape", pixels: new PixelMap() },
        { type: "group", figures: [], anchor: { x: 0, y: 0 } },
      ];
      const result = group(figures);
      expect(result).toEqual({
        type: "group",
        figures,
        anchor: { x: 0, y: 0 },
      });
    });
  });
  describe("shape", () => {
    it("should create a shape from a PixelMap", () => {
      const pixels = new PixelMap();
      pixels.set({ x: 1, y: 1 }, { r: 0, g: 0, b: 0 });
      const result = shape(pixels);
      expect(result).toEqual({ type: "shape", pixels });
    });
  });
});
