import { Color, Optional, Pixel, Sprite } from "./types.ts";
import { sprite } from "./builders.ts";

export function rect(width: number, height: number, color: Color): Sprite {
  const pixels: Pixel[][] = [];

  for (let x = 0; x < width; x++) {
    const row: Pixel[] = [];
    for (let y = 0; y < height; y++) {
      row.push(color);
    }
    pixels.push(row);
  }

  return sprite(pixels);
}

export function circle(radius: number, color: Color): Sprite {
  const pixels: Optional<Pixel>[][] = [];

  for (let x = -radius; x < radius; x++) {
    const row: Optional<Pixel>[] = [];
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        row.push(color);
      } else {
        row.push(null);
      }
    }
    pixels.push(row);
  }

  return sprite(pixels, { x: 0, y: 0 });
}

export default {
  rect,
  circle,
};
