import { Color, Point, Shape } from "../types.ts";
import { shape } from "../core/primitives.ts";
import {
  getStraightNeighbors,
  getDiagonalNeighbors,
} from "./utils/getNeighbors.ts";

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
  const pixels = what.pixels.clone();
  const queue: Point[] = [start];
  const visited: { [key: string]: boolean } = {};

  while (queue.length > 0) {
    const point = queue.shift()!;
    const key = `${point.x}:${point.y}`;

    if (visited[key]) continue;
    visited[key] = true;

    const pixel = pixels.get(point);
    if (!pixel) {
      pixels.set(point, color);

      // Add vertical and horizontal neighbors to queue
      for (const neighbor of getStraightNeighbors(point)) {
        if (pixels.inBounds(neighbor)) {
          queue.push(neighbor);
        }
      }

      // Add diagonal neighbors to queue
      if (mode === "includeDiagonals") {
        for (const neighbor of getDiagonalNeighbors(point)) {
          if (pixels.inBounds(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return shape(pixels);
}
