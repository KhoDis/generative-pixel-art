import { Figure, Group, Point, Shape } from "./types.ts";
import { PixelMap } from "./classes/PixelMap.ts";

export function group(
  figures: Figure[],
  anchor: Point = { x: 0, y: 0 },
): Group {
  return { type: "group", figures, anchor };
}

export function shape(pixels: PixelMap): Shape {
  return { type: "shape", pixels };
}
