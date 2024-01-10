import { Pixel, Point, Shape } from "../../types.ts";
import draw from "../../factories/draw.ts";
import place from "../../factories/place.ts";

/**
 * Creates a pixel shape.
 * @returns The placed pixel as a shape.
 */
export default function pixel(
  pixel: Pixel,
  point: Point = { x: 0, y: 0 },
): Shape {
  return draw(place(pixel, point.x, point.y));
}
