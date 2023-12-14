import { Blot, Color, Group, Optional, Pixel, Placement, Point, Sprite } from "./types.ts";
import { PixelMap } from "./classes/PixelMap.ts";

export function group(groups: Group[], anchor: Point = { x: 0, y: 0 }): Group {
  return { type: "group", groups, anchor };
}

export function at(x: number, y: number, what: Group): Group {
  return group([what], { x, y });
}

export function blot(pixels: Placement[]): Blot {
  return { type: "blot", pixels: PixelMap.fromPlacements(pixels) };
}

export function sprite(
  matrix: Optional<Pixel>[][],
  anchor: Point = { x: 0, y: 0 },
): Sprite {
  return { type: "sprite", matrix, anchor };
}

export function place(x: number, y: number, color: Color): Placement {
  return { position: { x, y }, pixel: color };
}
