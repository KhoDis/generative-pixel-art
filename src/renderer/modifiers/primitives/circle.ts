import { Color, InstructionId, Render } from "../../types.ts";
import { place } from "../index.ts";
import render from "../render.ts";
import { Primitive } from "./index.ts";

export type CircleParams = {
  radius: number;
  color: Color;
};

export type CircleInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "circle";
  };
  params: CircleParams;
  children: [];
};

export default class Circle extends Primitive {
  params: CircleParams;

  constructor(params: CircleParams, id?: InstructionId) {
    super(id);
    this.params = params;
  }

  render(): Render {
    const pixels = [];
    const { radius, color } = this.params;

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        if (x * x + y * y < radius * radius) {
          pixels.push(place(color, x + radius, y + radius));
        }
      }
    }

    return render(pixels);
  }

  toInstruction(): CircleInstruction {
    return {
      id: this.id,
      type: {
        category: "primitive",
        modifier: "circle",
      },
      params: this.params,
      children: [],
    };
  }
}
