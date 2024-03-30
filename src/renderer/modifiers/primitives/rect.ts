import {
  Color,
  InstructionId,
  Pivot,
  Point,
  Render,
  Shape,
} from "../../types.ts";
import { place } from "../index.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

export type RectParams = {
  width: number;
  height: number;
  pivot: Pivot;
  color: Color;
};

export type RectInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "rect";
  };
  params: RectParams;
  children: [];
};

export default class Rect implements Shape {
  constructor(
    public params: RectParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const pixels = [];
    const { width, height, pivot, color } = this.params;

    let pivotPoint: Point;
    switch (pivot) {
      case "top-left":
        pivotPoint = { x: 0, y: 0 };
        break;
      case "top":
        pivotPoint = { x: width / 2, y: 0 };
        break;
      case "top-right":
        pivotPoint = { x: width, y: 0 };
        break;
      case "left":
        pivotPoint = { x: 0, y: height / 2 };
        break;
      case "center":
        pivotPoint = { x: width / 2, y: height / 2 };
        break;
      case "right":
        pivotPoint = { x: width, y: height / 2 };
        break;
      case "bottom-left":
        pivotPoint = { x: 0, y: height };
        break;
      case "bottom":
        pivotPoint = { x: width / 2, y: height };
        break;
      case "bottom-right":
        pivotPoint = { x: width, y: height };
        break;
      default:
        pivotPoint = pivot;
    }

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        pixels.push(place(color, x - pivotPoint.x, y - pivotPoint.y));
      }
    }

    return render(pixels);
  }

  toInstruction(): RectInstruction {
    return {
      id: this.id,
      type: {
        category: "primitive",
        modifier: "rect",
      },
      params: this.params,
      children: [],
    };
  }
}
