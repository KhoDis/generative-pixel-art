import { Placement, Shape } from "../../types.ts";
import shape from "../../factories/shape.ts";

/**
 * Creates a shape from a set of placements.
 *
 * If multiple placements are on the same position, the last one will be used.
 * @param placements - The placements to form the shape.
 * @returns The created shape.
 */
export default function draw(...placements: Placement[]): Shape {
  return shape(placements);
}
