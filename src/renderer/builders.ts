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
import { PixelMap } from "./classes/PixelMap.ts";
import { PixelMatrix } from "./classes/PixelMatrix.ts";

export function group(groups: Group[], anchor: Point = { x: 0, y: 0 }): Group {
  return { type: "group", groups, anchor };
}

export function at(x: number, y: number, what: Group): Group {
  return group([what], { x, y });
}

export function blot(placements: Placement[]): Blot {
  const pixelMap = new PixelMap();
  for (const placement of placements) {
    pixelMap.set(placement.position, placement.pixel);
  }
  return { type: "blot", pixels: pixelMap };
}

export function sprite(
  matrix: Optional<Pixel>[][],
  anchor: Point = { x: 0, y: 0 },
): Sprite {
  const length = Math.max(0, ...matrix.map((row) => row.length));
  const height = matrix.length;

  const pixelMatrix = new PixelMatrix(length, height);
  for (let y = 0; y < height; y++) {
    const row = matrix[y];
    for (let x = 0; x < length; x++) {
      pixelMatrix.set({ x, y }, row[x] ?? null);
    }
  }

  return { type: "sprite", matrix: pixelMatrix, anchor };
}

export function place(x: number, y: number, color: Color): Placement {
  return { position: { x, y }, pixel: color };
}
