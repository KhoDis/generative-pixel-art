import Circle, { CircleInstruction } from "./circle.ts";
import Draw, { DrawInstruction } from "./draw.ts";
import Line, { LineInstruction } from "./line.ts";
import Pixel, { PixelInstruction } from "./pixel.ts";
import Polygon, { PolygonInstruction } from "./polygon.ts";
import Rect, { RectInstruction } from "./rect.ts";
import Empty, { EmptyInstruction } from "./empty.ts";
import { InstructionId, Render, Shape } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";

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

export abstract class Primitive implements Shape {
  id: InstructionId;

  protected constructor(id: InstructionId = uuidv4()) {
    this.id = id;
  }

  abstract render(): Render;
  abstract toInstruction(): PrimitiveInstruction;
}
