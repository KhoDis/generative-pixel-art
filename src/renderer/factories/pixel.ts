import { Pixel, Shape } from "../types.ts";
import draw from "./draw.ts";
import place from "./place.ts";

/**
 * Creates a pixel shape.
 * @returns The placed pixel as a shape.
 */
export default function pixel(
  pixel: Pixel,
  x: number = 0,
  y: number = 0,
): Shape {
  return draw(place(pixel, x, y));
}
