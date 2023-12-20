import { Point } from "../../types.ts";

/**
 * Gets the neighbors of a point.
 * @param point The point to get the neighbors of.
 * @param diagonals Whether to include diagonal neighbors.
 * @returns The neighbors of the point.
 */
export default function getNeighbors(
  point: Point,
  diagonals: boolean = false,
): Point[] {
  const neighbors = [
    { x: point.x - 1, y: point.y },
    { x: point.x + 1, y: point.y },
    { x: point.x, y: point.y - 1 },
    { x: point.x, y: point.y + 1 },
  ];

  if (diagonals) {
    neighbors.push(
      { x: point.x - 1, y: point.y - 1 },
      { x: point.x + 1, y: point.y - 1 },
      { x: point.x - 1, y: point.y + 1 },
      { x: point.x + 1, y: point.y + 1 },
    );
  }

  return neighbors;
}
