import { Color, Group, Point } from "./types.ts";
import { leaf, pixel } from "./utils.ts";

export function rect(width: number, height: number, color: Color): Group {
  const pixels = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels.push(pixel({ x, y }, color));
    }
  }
  return leaf(pixels);
}

export function circle(radius: number, color: Color): Group {
  const pixels = [];
  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(pixel({ x, y }, color));
      }
    }
  }

  return leaf(pixels, { x: radius, y: radius });
}

export function line(start: Point, end: Point, color: Color): Group {
  const pixels = [];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i < steps; i++) {
    const x = Math.round(start.x + (dx * i) / steps);
    const y = Math.round(start.y + (dy * i) / steps);
    pixels.push(pixel({ x, y }, color));
  }
  return leaf(pixels);
}