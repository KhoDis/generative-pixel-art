import { Color, Point, Shape } from "../types.ts";
import { shape } from "../primitives.ts";
import getNeighbors from "./utils/getNeighbors.ts";

/**
 * Fills a shape with a color.
 * @param what The shape to fill.
 * @param start The starting point.
 * @param color The color to fill with.
 * @param diagonals Whether to fill diagonally.
 */
export default function fill(
  what: Shape,
  start: Point,
  color: Color,
  diagonals: boolean = false,
): Shape {
  const newPixels = what.pixels.clone();
  const queue: Point[] = [start];
  const visited: { [key: string]: boolean } = {};

  while (queue.length > 0) {
    const point = queue.shift()!;
    const key = `${point.x}:${point.y}`;

    if (visited[key]) continue;
    visited[key] = true;

    const pixel = newPixels.get(point);
    if (!pixel) {
      newPixels.set(point, color);

      const neighbors = getNeighbors(point, diagonals);
      for (const neighbor of neighbors) {
        if (newPixels.inBounds(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return shape(newPixels);
}
