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

export type Figure = Group | Shape;

export type Group = {
  type: "group";
  groups: Figure[];
  anchor: Point;
};

export type Shape = {
  type: "shape";
  pixels: PixelMap;
};

export type Placement = {
  position: Point;
  pixel: Pixel;
};

export type Pixel = Color;
