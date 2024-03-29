import { Placement, Render } from "../types.ts";
import { PixelMap } from "../core/PixelMap.ts";

/**
 * Creates a shape from a set of placements.
 *
 * If multiple placements are on the same position, the last one will be used.
 * @param placements - The placements to form the shape.
 * @returns The created shape.
 */
export default function shape(placements: Placement[]): Render {
  return { pixels: new PixelMap(placements) };
}
