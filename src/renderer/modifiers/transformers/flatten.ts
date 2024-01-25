import { Figure, Placement, Shape } from "../../types.ts";
import { place } from "../../factories";
import shape from "../../factories/shape.ts";

/**
 * Recursively flattens nested figures into a single shape.
 *
 * Each pixel is adjusted according to the anchors of the groups it is nested in.
 * @param what - The figure to be flattened. Can be a group or a shape.
 * @returns The flattened shape.
 */
export default function flatten(what: Figure): Shape {
  const { type } = what;

  if (type === "shape") {
    return what;
  }

  const { figures, anchor } = what;

  const result: Placement[] = [];

  for (const nested of figures) {
    const flattened = flatten(nested);

    for (const { position, pixel } of flattened.pixels) {
      const { x, y } = position;
      result.push(place(pixel, x + anchor.x, y + anchor.y));
    }
  }

  return shape(result);
}
