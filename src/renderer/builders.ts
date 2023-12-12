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

export function at(x: number, y: number, what: Group): Group {
  return group([what], { x, y });
}

export function blot(pixels: Placement[]): Blot {
  const pixelsMap = new Map<string, Pixel>();
  for (const placement of pixels) {
    const { x, y } = placement.position;
    pixelsMap.set(`${x}:${y}`, placement.pixel);
  }
  return { type: "blot", pixels: pixelsMap };
}

export function toPlacements(pixels: Map<string, Pixel>): Placement[] {
  const placements: Placement[] = [];
  for (const [position, pixel] of pixels) {
    const [x, y] = position.split(":").map(Number);
    placements.push({ position: { x, y }, pixel });
  }
  return placements;
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
