import { Shape, Point, Pivot, Placement } from "../../types.ts";
import { place } from "../../factories";
import { Bounds } from "../../core/PixelMap.ts";
import shape from "../../factories/shape.ts";

function center(a: number, b: number): number {
  return Math.ceil((a + b) / 2);
}

function getPivotPoint(pivot: Pivot, bounds: Bounds): Point {
  switch (pivot) {
    case "top-left":
      return { x: bounds.minX, y: bounds.minY };
    case "top":
      return { x: center(bounds.minX, bounds.maxX), y: bounds.minY };
    case "top-right":
      return { x: bounds.maxX, y: bounds.minY };
    case "left":
      return { x: bounds.minX, y: center(bounds.minY, bounds.maxY) };
    case "center":
      return {
        x: center(bounds.minX, bounds.maxX),
        y: center(bounds.minY, bounds.maxY),
      };
    case "right":
      return { x: bounds.maxX, y: center(bounds.minY, bounds.maxY) };
    case "bottom-left":
      return { x: bounds.minX, y: bounds.maxY };
    case "bottom":
      return { x: center(bounds.minX, bounds.maxX), y: bounds.maxY };
    case "bottom-right":
      return { x: bounds.maxX, y: bounds.maxY };
    default:
      return pivot;
  }
}

/**
 * Resets the shape so that its pivot point is at the origin.
 *
 * The pivot is the point around which the shape is centered.
 *
 * `pivot(shape, point(1, 1))` is equivalent to `translate(shape, -1, -1)`.
 */
export default function reset(what: Shape, pivot: Pivot): Shape {
  const pixels: Placement[] = [];
  const bounds = what.pixels.bounds;

  const pivotPoint = getPivotPoint(pivot, bounds);

  for (const { position, pixel } of what.pixels) {
    const newX = position.x - pivotPoint.x;
    const newY = position.y - pivotPoint.y;
    pixels.push(place(pixel, newX, newY));
  }

  return shape(pixels);
}
