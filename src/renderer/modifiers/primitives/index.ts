import Circle, { CircleInstruction } from "./circle.ts";
import Draw, { DrawInstruction } from "./draw.ts";
import Line, { LineInstruction } from "./line.ts";
import Pixel, { PixelInstruction } from "./pixel.ts";
import Polygon, { PolygonInstruction } from "./polygon.ts";
import Rect, { RectInstruction } from "./rect.ts";
import Empty, { EmptyInstruction } from "./empty.ts";

export { Circle, Draw, Line, Pixel, Polygon, Rect, Empty };

export default {
  Circle,
  Draw,
  Line,
  Pixel,
  Polygon,
  Rect,
  Empty,
};

export type PrimitiveInstruction =
  | CircleInstruction
  | DrawInstruction
  | LineInstruction
  | PixelInstruction
  | PolygonInstruction
  | RectInstruction
  | EmptyInstruction;
