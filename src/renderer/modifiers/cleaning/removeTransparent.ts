import { Placement, Shape } from "../../types.ts";
import shape from "../../factories/shape.ts";

/**
 * Removes all fully transparent pixels from a shape.
 * @param what - The shape to clean.
 * @returns The cleaned shape.
 */
export default function removeTransparent(what: Shape): Shape {
  const updated: Placement[] = [];
  for (const { position, pixel } of what.pixels) {
    if (pixel.a === 0) continue;
    updated.push({ position, pixel });
  }

  return shape(updated);
}
