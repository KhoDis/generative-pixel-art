import { Color, Placement, Shape } from "../../types.ts";
import {
  getDiagonalNeighbors,
  getStraightNeighbors,
} from "../../utils/getNeighbors.ts";
import { draw } from "../../factories";

export type OutlineMode = "none" | "all" | "corners";

/**
 * Creates an outline around a shape.
 * @param what The shape to outline.
 * @param color The color of the outline.
 * @param mode Determines how diagonals are handled. Can be one of:
 * - "none": No diagonals are included.
 * - "all": All diagonals are included.
 * - "corners": Only corner diagonals are included.
 * @returns The outlined shape.
 */
export default function outline(
  what: Shape,
  color: Color,
  mode: OutlineMode = "corners",
): Shape {
  const pixels = what.pixels;
  const outlinePixels: Placement[] = [];

  // Place vertical and horizontal outline pixels
  for (const { position } of pixels) {
    const straightNeighbors = getStraightNeighbors(position);
    for (const neighbor of straightNeighbors) {
      if (!pixels.has(neighbor)) {
        outlinePixels.push({ position: neighbor, pixel: color });
      }
    }
  }

  // Place diagonal outline pixels
  if (mode === "none") {
    // nothing
  } else if (mode === "all") {
    for (const { position } of pixels) {
      const diagonalNeighbors = getDiagonalNeighbors(position);
      for (const neighbor of diagonalNeighbors) {
        if (!pixels.has(neighbor)) {
          outlinePixels.push({ position: neighbor, pixel: color });
        }
      }
    }
  } else if (mode === "corners") {
    for (const { position } of pixels) {
      const diagonalNeighbors = getDiagonalNeighbors(position);
      diagonalNeighbors.forEach((neighbor, i) => {
        // Check if target pixel is a corner
        if (
          !pixels.has(diagonalNeighbors[(i - 1 + 4) % 4]) && // smoothness check
          !pixels.has(diagonalNeighbors[(i + 1) % 4]) && // smoothness check
          !pixels.has(neighbor) // target placement
        ) {
          outlinePixels.push({
            position: neighbor,
            pixel: color,
          });
        }
      });
    }
  }

  return draw(...pixels, ...outlinePixels);
}
