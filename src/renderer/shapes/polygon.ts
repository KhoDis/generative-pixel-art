import { Color, Group, Point } from "../types.ts";
import line from "./line.ts";
import { group } from "../builders.ts";

/**
 * Creates a polygon.
 * @returns The polygon as a group.
 */
export default function polygon(
  points: Point[],
  color: Color,
  enclose: boolean = false,
): Group {
  const lines = [];

  for (let i = 0; i < points.length - 1; i++) {
    lines.push(line(points[i], points[i + 1], color));
  }

  if (enclose) {
    lines.push(line(points[points.length - 1], points[0], color));
  }

  return group(lines);
}
