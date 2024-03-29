import {
  Instruction,
  Pivot,
  Placement,
  Point,
  Render,
  Shape,
} from "../../types.ts";
import { Transformer } from "./index.ts";
import { Bounds } from "../../core/PixelMap.ts";
import { place, shape } from "../../factories";

function center(a: number, b: number): number {
  return Math.ceil((a + b) / 2);
}

function getPivotPoint(pivot: Pivot, bounds: Bounds): Point {
  switch (pivot) {
    case "top-left":
      return { x: bounds.minX, y: bounds.minY };
    case "top":
      return { x: center(bounds.minX, bounds.maxX), y: bounds.minY };
    case "top-right":
      return { x: bounds.maxX, y: bounds.minY };
    case "left":
      return { x: bounds.minX, y: center(bounds.minY, bounds.maxY) };
    case "center":
      return {
        x: center(bounds.minX, bounds.maxX),
        y: center(bounds.minY, bounds.maxY),
      };
    case "right":
      return { x: bounds.maxX, y: center(bounds.minY, bounds.maxY) };
    case "bottom-left":
      return { x: bounds.minX, y: bounds.maxY };
    case "bottom":
      return { x: center(bounds.minX, bounds.maxX), y: bounds.maxY };
    case "bottom-right":
      return { x: bounds.maxX, y: bounds.maxY };
    default:
      return pivot;
  }
}
export type ResetParams = {
  pivot: Pivot;
};

export type ResetInstruction = {
  type: {
    category: "transformer";
    modifier: "reset";
  };
  params: ResetParams;
  children: [Instruction];
};

export default class Reset extends Transformer {
  params: ResetParams;

  constructor({ shape, pivot }: ResetParams & { shape: Shape }) {
    super(shape);
    this.params = { pivot };
  }

  render(): Render {
    const pixels: Placement[] = [];
    const bounds = this.shape.render().pixels.bounds;

    const pivotPoint = getPivotPoint(this.params.pivot, bounds);

    for (const { position, pixel } of this.shape.render().pixels) {
      const newX = position.x - pivotPoint.x;
      const newY = position.y - pivotPoint.y;
      pixels.push(place(pixel, newX, newY));
    }

    return shape(pixels);
  }

  toInstruction(): ResetInstruction {
    return {
      type: {
        category: "transformer",
        modifier: "reset",
      },
      params: this.params,
      children: [this.shape.toInstruction()],
    };
  }
}
