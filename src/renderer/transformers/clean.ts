import { Shape } from "../types.ts";
import { PixelMap } from "../core/PixelMap.ts";
import { shape } from "../core/primitives.ts";

/**
 * Removes all fully transparent pixels from a shape.
 * @param what - The shape to clean.
 * @returns The cleaned shape.
 */
export default function clean(what: Shape): Shape {
  const { pixels } = what;

  const updated = new PixelMap();

  for (const { position, pixel } of pixels) {
    if (pixel.a === 0) continue;
    updated.set(position, pixel);
  }

  return shape(updated);
}
