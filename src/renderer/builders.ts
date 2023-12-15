import { Figure, Group, Pixel, Placement, Shape } from "./types.ts";
import { PixelMap } from "./classes/PixelMap.ts";

export function group(figures: Figure[], x: number = 0, y: number = 0): Group {
  return { type: "group", groups: figures, anchor: { x, y } };
}

export function combine(...groups: Figure[]): Group {
  return group(groups);
}
/**
 *
 *
 * @param {Figure} what - The figure to move.
 * @param {number} [x=0] - The x coordinate of the position.
 * @param {number} [y=0] - The y coordinate of the position.
 * @returns {Figure} The group placed at the specified position.
 */

export function move(what: Figure, x: number = 0, y: number = 0): Group {
  if (what.type === "shape") {
    return group([what], x, y);
  }

  return group(what.groups, what.anchor.x + x, what.anchor.y + y);
}

export function shape(...placements: Placement[]): Shape {
  const pixelMap = new PixelMap();
  for (const placement of placements) {
    pixelMap.set(placement.position, placement.pixel);
  }
  return { type: "shape", pixels: pixelMap };
}

export function place(pixel: Pixel, x: number = 0, y: number = 0): Placement {
  return { position: { x, y }, pixel };
}

export default {
  group,
  combine,
  move,
  shape,
  place,
};
