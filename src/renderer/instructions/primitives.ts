import { Color, Pivot, Pixel, Placement, Point } from "../types.ts";

export type CircleInstruction = {
  type: "primitive/circle";
  radius: number;
  color: Color;
};

export function circle(radius: number, color: Color): CircleInstruction {
  return { type: "primitive/circle", radius, color };
}

export type DrawInstruction = {
  type: "primitive/draw";
  placements: Placement[];
};

export function draw(...placements: Placement[]): DrawInstruction {
  return { type: "primitive/draw", placements };
}

export type LineInstruction = {
  type: "primitive/line";
  start: Point;
  end: Point;
  color: Color;
};

export function line(start: Point, end: Point, color: Color): LineInstruction {
  return { type: "primitive/line", start, end, color };
}

export type PixelInstruction = {
  type: "primitive/pixel";
  color: Pixel;
  point: Point;
};

export function pixel(
  color: Pixel,
  point: Point = { x: 0, y: 0 },
): PixelInstruction {
  return { type: "primitive/pixel", color, point };
}

export type PolygonInstruction = {
  type: "primitive/polygon";
  points: Point[];
  color: Color;
  enclose: boolean;
};

export function polygon(
  points: Point[],
  color: Color,
  enclose: boolean = false,
): PolygonInstruction {
  return { type: "primitive/polygon", points, color, enclose };
}

export type RectFromPointsInstruction = {
  type: "primitive/rect/fromPoints";
  start: Point;
  end: Point;
  color: Color;
};

export function rectFromPoints(
  start: Point,
  end: Point,
  color: Color,
): RectFromPointsInstruction {
  return { type: "primitive/rect/fromPoints", start, end, color };
}

export type RectFromDimensionsInstruction = {
  type: "primitive/rect/fromDimensions";
  width: number;
  height: number;
  pivot: Pivot;
  color: Color;
};

export function rectFromDimensions(
  width: number,
  height: number,
  pivot: Pivot,
  color: Color,
): RectFromDimensionsInstruction {
  return { type: "primitive/rect/fromDimensions", width, height, pivot, color };
}

export type RectInstruction =
  | RectFromPointsInstruction
  | RectFromDimensionsInstruction;

export type PrimitiveInstruction =
  | CircleInstruction
  | DrawInstruction
  | LineInstruction
  | PixelInstruction
  | PolygonInstruction
  | RectInstruction;
