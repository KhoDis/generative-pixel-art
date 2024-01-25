import { Color, Pivot, Point, Shape } from "../../types.ts";
import { place } from "../../factories";
import shape from "../../factories/shape.ts";

/**
 * Creates a rectangle between two points (both inclusive).
 *
 * Points can be in any order.
 * @returns The rectangle as a shape.
 */
export function rectFromPoints(start: Point, end: Point, color: Color): Shape {
  const pixels = [];

  // consider that start can be greater than end
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      pixels.push(place(color, x, y));
    }
  }

  return shape(pixels);
}

/**
 * Creates a rectangle from dimensions.
 *
 * The pivot is the point around which the rectangle is centered.
 * @returns The rectangle as a shape.
 */
export function rectFromDimensions(
  width: number,
  height: number,
  pivot: Pivot,
  color: Color,
): Shape {
  const pixels = [];

  let pivotPoint: Point;
  switch (pivot) {
    case "top-left":
      pivotPoint = { x: 0, y: 0 };
      break;
    case "top":
      pivotPoint = { x: width / 2, y: 0 };
      break;
    case "top-right":
      pivotPoint = { x: width, y: 0 };
      break;
    case "left":
      pivotPoint = { x: 0, y: height / 2 };
      break;
    case "center":
      pivotPoint = { x: width / 2, y: height / 2 };
      break;
    case "right":
      pivotPoint = { x: width, y: height / 2 };
      break;
    case "bottom-left":
      pivotPoint = { x: 0, y: height };
      break;
    case "bottom":
      pivotPoint = { x: width / 2, y: height };
      break;
    case "bottom-right":
      pivotPoint = { x: width, y: height };
      break;
    default:
      pivotPoint = pivot;
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels.push(place(color, x - pivotPoint.x, y - pivotPoint.y));
    }
  }

  return shape(pixels);
}

export default {
  fromPoints: rectFromPoints,
  fromDimensions: rectFromDimensions,
};
