import { Figure, Group, Point } from "../../types.ts";
import group from "../../factories/group.ts";

/**
 * Moves a figure to a specified position.
 *
 * If the figure is a group, new group is created with the same figures and the offset is added to the anchor.
 *
 * If the figure is a shape, the shape is wrapped in a group with the specified position as the anchor.
 * @param what - The figure to move.
 * @param [offset={ x: 0, y: 0 }] - The position to move the figure to.
 * @returns The group placed at the new position.
 */
export default function move(
  what: Figure,
  offset: Point = { x: 0, y: 0 },
): Group {
  if (what.type === "shape") {
    return group([what], { x: offset.x, y: offset.y });
  }
  return group(what.figures, {
    x: what.anchor.x + offset.x,
    y: what.anchor.y + offset.y,
  });
}
