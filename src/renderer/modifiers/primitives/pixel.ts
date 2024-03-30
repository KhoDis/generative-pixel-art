import { Color, InstructionId, Point, Render } from "../../types.ts";
import place from "../place.ts";
import { Primitive } from "./index.ts";
import render from "../render.ts";

export type PixelParams = {
  color: Color;
  point: Point;
};

export type PixelInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "pixel";
  };
  params: PixelParams;
  children: [];
};

export default class Pixel extends Primitive {
  params: PixelParams;

  constructor(params: PixelParams, id?: InstructionId) {
    super(id);
    this.params = params;
  }

  render(): Render {
    const { color, point } = this.params;
    return render([place(color, point.x, point.y)]);
  }

  toInstruction(): PixelInstruction {
    return {
      id: this.id,
      type: {
        category: "primitive",
        modifier: "pixel",
      },
      params: this.params,
      children: [],
    };
  }
}
