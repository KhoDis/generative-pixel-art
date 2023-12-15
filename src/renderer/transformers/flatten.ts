import { Figure, Placement, Shape } from "../types.ts";
import { place, shape } from "../builders.ts";

/**
 * Flattens a figure into a single shape.
 *
 * Recursively flattens nested groups.
 *
 * Each pixel is adjusted according to the anchors of the groups it is nested in.
 *
 * @param figure - The figure to be flattened. Can be a group or a shape.
 * @returns The flattened shape.
 */
export function flatten(figure: Figure): Shape {
  const { type } = figure;

  if (type === "shape") {
    return figure;
  }

  const { groups, anchor } = figure;

  const result: Placement[] = [];

  for (const nested of groups) {
    const flattened = flatten(nested);

    for (const { position, pixel } of flattened.pixels) {
      const { x, y } = position;
      result.push(place(pixel, x + anchor.x, y + anchor.y));
    }
  }

  return shape(...result);
}
