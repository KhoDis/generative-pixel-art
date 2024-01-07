import { Color, Placement, Point, Shape } from "../../types.ts";
import {
  getStraightNeighbors,
  getDiagonalNeighbors,
} from "../../utils/getNeighbors.ts";
import { draw } from "../../factories";

type TraversalMode = "straightOnly" | "includeDiagonals";

/**
 * Fills a shape with a color.
 * @param what The shape to fill.
 * @param start The starting point.
 * @param color The color to fill with.
 * @param mode Determines how diagonals are handled. Can be one of:
 * - "straightOnly": Go through vertical and horizontal neighbors only.
 * - "includeDiagonals": Go through vertical, horizontal and diagonal neighbors.
 */
export default function fill(
  what: Shape,
  start: Point,
  color: Color,
  mode: TraversalMode = "straightOnly",
): Shape {
  const oldPixels = what.pixels;
  const filledPixels: Placement[] = [];

  const queue: Point[] = [start];
  const visited: { [key: string]: boolean } = {};

  while (queue.length > 0) {
    const point = queue.shift()!;
    const key = `${point.x}:${point.y}`;

    if (visited[key]) continue;
    visited[key] = true;

    const pixel = oldPixels.get(point);
    if (!pixel) {
      filledPixels.push({ position: point, pixel: color });

      // Add vertical and horizontal neighbors to queue
      for (const neighbor of getStraightNeighbors(point)) {
        if (oldPixels.inBounds(neighbor)) {
          queue.push(neighbor);
        }
      }

      // Add diagonal neighbors to queue
      if (mode === "includeDiagonals") {
        for (const neighbor of getDiagonalNeighbors(point)) {
          if (oldPixels.inBounds(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return draw(...filledPixels, ...oldPixels);
}
