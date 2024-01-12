import { Figure, Group, Point } from "../../types.ts";

/**
 * Creates a group of figures at a specified position.
 * @param figures - The figures to group.
 * @param [anchor={ x: 0, y: 0 }] - The position of the group.
 * @returns The group of figures.
 */
export default function group(
  figures: Figure[],
  anchor: Point = { x: 0, y: 0 },
): Group {
  return { type: "group", figures, anchor };
}
