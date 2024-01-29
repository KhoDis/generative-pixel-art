import circle from "./circle.ts";
import draw from "./draw.ts";
import line from "./line.ts";
import pixel from "./pixel.ts";
import polygon from "./polygon.ts";
import rect from "./rect.ts";
import { ShapeClass } from "../index.ts";

export { circle, draw, line, pixel, polygon, rect };

export default {
  circle,
  draw,
  line,
  pixel,
  polygon,
  rect,
};

export abstract class PrimitiveClass<T> extends ShapeClass<T> {
  readonly category = "primitive";

  protected constructor() {
    super();
  }
}