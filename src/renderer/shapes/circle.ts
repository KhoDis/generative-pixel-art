import { Color, Shape } from "../types.ts";
import { place, shape } from "../builders.ts";

/**
 * Creates a circle.
 * @returns The circle as a shape.
 */
export default function circle(radius: number, color: Color): Shape {
  const pixels = [];

  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(place(color, x + radius, y + radius));
      }
    }
  }

  return shape(...pixels);
}
