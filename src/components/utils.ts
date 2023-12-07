import { Color, Group, Pixel, Point } from "./types.ts";

export function leaf(pixels: Pixel[], anchor: Point = { x: 0, y: 0 }): Group {
  return { type: "leaf", pixels, anchor };
}

export function group(groups: Group[], anchor: Point = { x: 0, y: 0 }): Group {
  return { type: "group", groups, anchor };
}

export function pixel(position: Point, color: Color): Pixel {
  return { position, color };
}