import { Placement, Shape } from "../../types.ts";
import { place } from "../../factories";
import shape from "../../factories/shape.ts";

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

  const trimmed: Placement[] = [];

  for (const { position, pixel } of pixels) {
    const { x, y } = position;
    trimmed.push(place(pixel, x - minX, y - minY));
  }

  return shape(trimmed);
}
