import {
  InstructionId,
  Pivot,
  Placement,
  Point,
  Render,
  Shape,
} from "../../types.ts";
import { Bounds } from "../../core/PixelMap.ts";
import { place, render } from "../index.ts";
import { v4 as uuidv4 } from "uuid";

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
  id: InstructionId;
  type: {
    category: "transformer";
    modifier: "reset";
  };
  params: ResetParams;
  children: [InstructionId];
};

export default class Reset implements Shape {
  constructor(
    public params: ResetParams,
    public shape: Shape,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const pixels: Placement[] = [];
    const bounds = this.shape.render().pixels.bounds;

    const pivotPoint = getPivotPoint(this.params.pivot, bounds);

    for (const { position, pixel } of this.shape.render().pixels) {
      const newX = position.x - pivotPoint.x;
      const newY = position.y - pivotPoint.y;
      pixels.push(place(pixel, newX, newY));
    }

    return render(pixels);
  }

  toInstruction(): ResetInstruction {
    return {
      id: this.id,
      type: {
        category: "transformer",
        modifier: "reset",
      },
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
