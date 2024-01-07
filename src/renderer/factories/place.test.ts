import { Pixel } from "../types.ts";
import place from "./place.ts";

describe("place", () => {
  it("should place a pixel at a specified position", () => {
    const pixel: Pixel = { r: 0, g: 0, b: 0 };
    const result = place(pixel, 1, 2);
    expect(result).toEqual({ position: { x: 1, y: 2 }, pixel });
  });
  it("should place a pixel at 0, 0 if no position is specified", () => {
    const pixel: Pixel = { r: 0, g: 0, b: 0 };
    const result = place(pixel);
    expect(result).toEqual({ position: { x: 0, y: 0 }, pixel });
  });
});
