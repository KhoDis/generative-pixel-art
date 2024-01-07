import { Placement, Point, Shape } from "../../types.ts";
import { shape } from "../builders";

export type FlipMode = "x" | "y" | "xy";

/**
 * Flips a shape along a specified axis.
 *
 * Returns a new group with the flipped shape.
 * @param what - The shape to flip.
 * @param axis - The axis to flip the shape along.
 * @param [anchor={ x: 0, y: 0 }] - The center of the flip.
 * @returns The group with the flipped shape.
 */
export default function flip(
  what: Shape,
  axis: FlipMode,
  anchor: Point = { x: 0, y: 0 },
): Shape {
  const pixels: Placement[] = [];

  // Yes, this is a lot of code duplication, but it's the fastest way to do it.
  if (axis === "x") {
    for (const { position, pixel } of what.pixels) {
      pixels.push({
        position: { ...position, y: 2 * anchor.y - position.y },
        pixel,
      });
    }
  } else if (axis === "y") {
    for (const { position, pixel } of what.pixels) {
      pixels.push({
        position: { ...position, x: 2 * anchor.x - position.x },
        pixel,
      });
    }
  } else if (axis === "xy") {
    for (const { position, pixel } of what.pixels) {
      pixels.push({
        position: {
          x: 2 * anchor.x - position.x,
          y: 2 * anchor.y - position.y,
        },
        pixel,
      });
    }
  }

  return shape(pixels);
}
