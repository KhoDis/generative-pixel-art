import {
  Blot,
  Color,
  Group,
  Optional,
  Pixel,
  Placement,
  Point,
  Sprite,
} from "./types.ts";

export function group(groups: Group[], anchor: Point = { x: 0, y: 0 }): Group {
  return { type: "group", groups, anchor };
}

export function blot(
  pixels: Placement[],
  anchor: Point = { x: 0, y: 0 },
): Blot {
  return { type: "blot", pixels, anchor };
}

export function sprite(
  matrix: Optional<Pixel>[][],
  anchor: Point = { x: 0, y: 0 },
): Sprite {
  return { type: "sprite", matrix, anchor };
}

export function place(position: Point, color: Color): Placement {
  return { position, pixel: color };
}

export function pixel(pixel: Pixel): Pixel {
  return pixel;
}
