import { Figure, Group, Pixel, Placement, Point, Shape } from "./types.ts";
import { PixelMap } from "./core/PixelMap.ts";

/**
 * Creates a group of figures at a specified position.
 * @param figures - The figures to group.
 * @param [x=0] - The x coordinate of the group's position.
 * @param [y=0] - The y coordinate of the group's position.
 * @returns The group of figures.
 */
export function group(figures: Figure[], x: number = 0, y: number = 0): Group {
  return { type: "group", figures, anchor: { x, y } };
}

/**
 * Combines multiple figures into a group.
 * @param groups - The figures to combine.
 * @returns The combined group of figures.
 */
export function combine(...groups: Figure[]): Group {
  return group(groups);
}

/**
 * Moves a figure to a specified position.
 *
 * If it's a shape, it will be grouped at the new position, otherwise returns a new group with moved anchor.
 * @param figure - The figure to move.
 * @param [x=0] - The x coordinate of the new position.
 * @param [y=0] - The y coordinate of the new position.
 * @returns The group placed at the new position.
 */
export function move(figure: Figure, x: number = 0, y: number = 0): Group {
  if (figure.type === "shape") {
    return group([figure], x, y);
  }

  return group(figure.figures, figure.anchor.x + x, figure.anchor.y + y);
}

/**
 * Creates a shape from a set of placements.
 *
 * If multiple placements are on the same position, the last one will be used.
 * @param placements - The placements to form the shape.
 * @returns The created shape.
 */
export function shape(...placements: Placement[]): Shape {
  const pixelMap = new PixelMap();
  for (const placement of placements) {
    pixelMap.set(placement.position, placement.pixel);
  }
  return { type: "shape", pixels: pixelMap };
}

/**
 * Places a pixel at a specified position.
 * @param pixel - The pixel to place.
 * @param [x=0] - The x coordinate of the position.
 * @param [y=0] - The y coordinate of the position.
 * @returns The placement of the pixel.
 */
export function place(pixel: Pixel, x: number = 0, y: number = 0): Placement {
  return { position: { x, y }, pixel };
}

/**
 * Creates a point.
 * @param x
 * @param y
 * @returns The point.
 * @see Point
 */
export function point(x: number, y: number): Point {
  return { x, y };
}

export default {
  group,
  combine,
  move,
  shape,
  place,
  point,
};
