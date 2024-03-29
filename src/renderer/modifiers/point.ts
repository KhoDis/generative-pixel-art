import { Point } from "../types.ts";

/**
 * Creates a point.
 * @param x
 * @param y
 * @returns The point.
 * @see Point
 */
export default function point(x: number, y: number): Point {
  return { x, y };
}
