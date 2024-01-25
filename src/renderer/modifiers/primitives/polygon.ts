import { Color, Placement, Point, Shape } from "../../types.ts";
import shape from "../../factories/shape.ts";
import line from "./line.ts";

/**
 * Creates a polygon.
 * @returns The polygon as a group.
 */
export default function polygon(
  points: Point[],
  color: Color,
  enclose: boolean = false,
): Shape {
  const placements: Placement[][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    placements.push(
      line(points[i], points[i + 1], color).pixels.toPlacements(),
    );
  }

  if (enclose) {
    placements.push(
      line(points[points.length - 1], points[0], color).pixels.toPlacements(),
    );
  }

  return shape(placements.flat());
}
