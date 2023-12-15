import { Color, Pixel, Point, Shape } from "./types.ts";
import { place, shape } from "./builders.ts";

export function pixel(pixel: Pixel, x: number = 0, y: number = 0): Shape {
  return shape(place(pixel, x, y));
}

export function rect(width: number, height: number, color: Color): Shape {
  const pixels = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels.push(place(color, x, y));
    }
  }

  return shape(...pixels);
}

export function circle(radius: number, color: Color): Shape {
  const pixels = [];

  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(place(color, x + radius, y + radius));
      }
    }
  }

  return shape(...pixels);
}

export function line(start: Point, end: Point, color: Color): Shape {
  const pixels = [];

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  for (let i = 0; i < steps; i++) {
    const x = Math.round(start.x + (dx * i) / steps);
    const y = Math.round(start.y + (dy * i) / steps);
    pixels.push(place(color, x, y));
  }

  return shape(...pixels);
}

export default {
  pixel,
  rect,
  circle,
  line,
};
