import { Figure, Group } from "../types.ts";
import group from "../modifiers/builders/group.ts";

/**
 * Combines multiple figures into a group.
 * @param groups - The figures to combine.
 * @returns The combined group of figures.
 */
export default function combine(...groups: Figure[]): Group {
  return group(groups);
}
