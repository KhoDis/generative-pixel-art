import { Blot, Color, Point } from "./types.ts";
import { blot, place } from "./builders.ts";

export function rect(width: number, height: number, color: Color): Blot {
  const pixels = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels.push(place({ x, y }, color));
    }
  }

  return blot(pixels);
}

export function circle(radius: number, color: Color): Blot {
  const pixels = [];

  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(place({ x, y }, color));
      }
    }
  }

  return blot(pixels, { x: radius, y: radius });
}

export function line(start: Point, end: Point, color: Color): Blot {
  const pixels = [];

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  for (let i = 0; i < steps; i++) {
    const x = Math.round(start.x + (dx * i) / steps);
    const y = Math.round(start.y + (dy * i) / steps);
    pixels.push(place({ x, y }, color));
  }

  return blot(pixels);
}

export default {
  rect,
  circle,
  line,
};
