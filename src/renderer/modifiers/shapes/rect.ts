import { Color, Shape } from "../../types.ts";
import { shape } from "../builders";
import { place } from "../../factories";

/**
 * Creates a rectangle.
 * @returns The rectangle as a shape.
 */
export default function rect(
  width: number,
  height: number,
  color: Color,
): Shape {
  const pixels = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels.push(place(color, x, y));
    }
  }

  return shape(pixels);
}
