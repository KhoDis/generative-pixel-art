import { Color, Placement, Shape } from "../types.ts";
import getNeighbors from "./utils/getNeighbors.ts";
import { shape } from "../builders.ts";

/**
 * Creates an outline around a shape.
 * @param what The shape to outline.
 * @param color The color of the outline.
 * @param diagonals Whether to include diagonals.
 */
export default function outline(
  what: Shape,
  color: Color,
  diagonals: boolean = false,
): Shape {
  const newPixels = what.pixels;
  const outlinePixels: Placement[] = [];

  for (const { position } of newPixels) {
    const neighbors = getNeighbors(position, diagonals);
    for (const neighbor of neighbors) {
      if (!newPixels.get(neighbor)) {
        outlinePixels.push({ position: neighbor, pixel: color });
      }
    }
  }

  return shape(...newPixels, ...outlinePixels);
}
