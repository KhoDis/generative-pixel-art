import { Figure, Placement, Shape } from "../types.ts";
import { place, shape } from "../builders.ts";

export function flatten(group: Figure): Shape {
  const { type } = group;

  if (type === "shape") {
    return group;
  }

  const { groups, anchor } = group;

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
