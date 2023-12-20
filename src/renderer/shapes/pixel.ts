import { Pixel, Shape } from "../types.ts";
import { place, shape } from "../builders.ts";

/**
 * Creates a pixel shape.
 * @returns The placed pixel as a shape.
 */
export default function pixel(
  pixel: Pixel,
  x: number = 0,
  y: number = 0,
): Shape {
  return shape(place(pixel, x, y));
}
