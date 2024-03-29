import { Color, Point, Render } from "../../types.ts";
import place from "../place.ts";
import { Primitive } from "./index.ts";
import Draw from "./draw.ts";

export type PixelParams = {
  color: Color;
  point: Point;
};

export type PixelInstruction = {
  type: {
    category: "primitive";
    modifier: "pixel";
  };
  params: PixelParams;
  children: [];
};

export default class Pixel implements Primitive {
  params: PixelParams;

  constructor(color: Color, point: Point = { x: 0, y: 0 }) {
    this.params = { color, point };
  }

  render(): Render {
    const { color, point } = this.params;
    return new Draw(place(color, point.x, point.y)).render();
  }

  toInstruction(): PixelInstruction {
    return {
      type: {
        category: "primitive",
        modifier: "pixel",
      },
      params: this.params,
      children: [],
    };
  }
}
