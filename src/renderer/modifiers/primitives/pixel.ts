import { Color, InstructionId, Point, Render, Shape } from "../../types.ts";
import place from "../place.ts";
import createRender from "../createRender.ts";
import { v4 as uuidv4 } from "uuid";

export type PixelParams = {
  color: Color;
  point: Point;
};

export type PixelInstruction = {
  id: InstructionId;
  category: "primitive";
  modifier: "pixel";
  params: PixelParams;
  children: [];
};

export default class Pixel implements Shape {
  constructor(
    public params: PixelParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const { color, point } = this.params;
    return createRender([place(color, point.x, point.y)]);
  }

  toInstruction(): PixelInstruction {
    return {
      id: this.id,
      category: "primitive",
      modifier: "pixel",
      params: this.params,
      children: [],
    };
  }
}
