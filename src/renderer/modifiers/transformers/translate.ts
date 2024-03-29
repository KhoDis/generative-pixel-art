import { Placement, Point, Shape } from "../../types.ts";
import { place } from "../../factories";
import shape from "../../factories/shape.ts";

/**
 * Translates a shape to a specified position.
 *
 * Updates the position of each pixel in the shape.
 * @param what - The shape to move.
 * @param [offset={ x: 0, y: 0 }] - The position to move the shape to.
 * @returns The shifted shape.
 */
export default function translate(
  what: Shape,
  offset: Point = { x: 0, y: 0 },
): Shape {
  const pixels: Placement[] = [];

  for (const { position, pixel } of what.pixels) {
    const newX = position.x + offset.x;
    const newY = position.y + offset.y;
    pixels.push(place(pixel, newX, newY));
  }

  return shape(pixels);
}
