import { Color, Point, Shape } from "../../types.ts";
import { shape } from "../builders";
import { place } from "../../factories";

/**
 * Creates a line.
 * @returns The line as a shape.
 */
export default function line(start: Point, end: Point, color: Color): Shape {
  const pixels = [];

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  const xStep = dx / steps;
  const yStep = dy / steps;

  for (let i = 0; i <= steps; i++) {
    const x = Math.round(start.x + xStep * i);
    const y = Math.round(start.y + yStep * i);
    pixels.push(place(color, x, y));
  }

  return shape(pixels);
}
