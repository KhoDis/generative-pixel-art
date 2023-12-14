import { PixelMap } from "./classes/PixelMap.ts";

export type Point = {
  x: number;
  y: number;
};

export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type Group =
  | {
      type: "group";
      groups: Group[];
      anchor: Point;
    }
  | Blot
  | Sprite;

export type Blot = {
  type: "blot";
  pixels: PixelMap;
};

export type Optional<T> = T | null;

export type Sprite = {
  type: "sprite";
  matrix: Optional<Pixel>[][];
  anchor: Point;
};

export type Placement = {
  position: Point;
  pixel: Pixel;
};

export type Pixel = Color;
