import { Color, Pivot, Point, Render } from "../../types.ts";
import { place } from "../index.ts";
import render from "../render.ts";
import { Primitive } from "./index.ts";

export type RectParams = {
  width: number;
  height: number;
  pivot: Pivot;
  color: Color;
};

export type RectInstruction = {
  type: {
    category: "primitive";
    modifier: "rect";
  };
  params: RectParams;
  children: [];
};

export default class Rect implements Primitive {
  params: RectParams;

  constructor(width: number, height: number, pivot: Pivot, color: Color) {
    this.params = { width, height, pivot, color };
  }

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
      type: {
        category: "primitive",
        modifier: "rect",
      },
      params: this.params,
      children: [],
    };
  }
}
