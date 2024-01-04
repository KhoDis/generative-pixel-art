import { Shape } from "../types.ts";
import { PixelMap } from "../core/PixelMap.ts";
import { shape } from "../core/primitives.ts";

/**
 * Trims a shape by removing empty space.
 * Moves the contents of the shape to the top left corner.
 * @param what - The shape to trim.
 * @returns The trimmed shape.
 */
export default function trim(what: Shape): Shape {
  const { pixels } = what;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const { position } of pixels) {
    const { x, y } = position;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const trimmed = new PixelMap();

  for (const { position, pixel } of pixels) {
    const { x, y } = position;
    trimmed.set({ x: x - minX, y: y - minY }, pixel);
  }

  return shape(trimmed);
}
