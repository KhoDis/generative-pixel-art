import { Point } from "../types.ts";

/**
 * Gets vertical and horizontal neighbors of a point.
 * @param point The point to get the neighbors of.
 * @returns The neighbors of the point.
 */
export function getStraightNeighbors(point: Point): Point[] {
  const { x, y } = point;
  return [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ];
}

/**
 * Gets diagonal neighbors of a point.
 * @param point The point to get the neighbors of.
 * @returns The neighbors of the point.
 */
export function getDiagonalNeighbors(point: Point): Point[] {
  const { x, y } = point;
  return [
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y + 1 },
  ];
}
