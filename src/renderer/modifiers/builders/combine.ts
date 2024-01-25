import { Figure, Group } from "../../types.ts";
import group from "../../factories/group.ts";

/**
 * Combines multiple figures into a group.
 * @returns The combined group of figures.
 */
export default function combine(...groups: Figure[]): Group {
  return group(groups);
}
