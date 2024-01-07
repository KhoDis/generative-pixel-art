import { Placement, Point, Shape } from "../../types.ts";
import { place } from "../../factories";
import shape from "../builders/shape.ts";

export type RotationMode = "90cw" | "90ccw" | "180" | "none";

/**
 * Rotates a shape around an anchor point (center of rotation).
 * @param what - The shape to rotate.
 * @param anchor - The center of rotation.
 * @param [mode = "none"] - The rotation mode. Can be one of:
 * - "90cw" - Rotates 90 degrees clockwise.
 * - "90ccw" - Rotates 90 degrees counter-clockwise.
 * - "180" - Rotates 180 degrees.
 * - "none" - Does not rotate.
 * @returns The rotated shape.
 */
export default function rotate(
  what: Shape,
  anchor: Point,
  mode: RotationMode = "none",
): Shape {
  const placements: Placement[] = [];

  // Yes, this is a lot of code duplication, but it's the fastest way to do it.
  if (mode === "90cw") {
    for (const { position, pixel } of what.pixels) {
      const newX = anchor.y + position.y - anchor.x;
      const newY = anchor.x + anchor.y - position.x;
      placements.push(place(pixel, newX, newY));
    }
  } else if (mode === "90ccw") {
    for (const { position, pixel } of what.pixels) {
      const newX = anchor.x + anchor.y - position.y;
      const newY = anchor.y + position.x - anchor.x;
      placements.push(place(pixel, newX, newY));
    }
  } else if (mode === "180") {
    for (const { position, pixel } of what.pixels) {
      const newX = 2 * anchor.x - position.x;
      const newY = 2 * anchor.y - position.y;
      placements.push(place(pixel, newX, newY));
    }
  } else if (mode === "none") {
    for (const { position, pixel } of what.pixels) {
      placements.push(place(pixel, position.x, position.y));
    }
  }

  return shape(placements);
}
