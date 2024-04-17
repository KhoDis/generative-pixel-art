import { Color, InstructionId, Render, Shape } from "../../types.ts";
import { place } from "../index.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

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

export default class Circle implements Shape {
  constructor(
    public params: CircleParams = {
      radius: 5,
      color: { r: 0, g: 0, b: 0, a: 1 },
    },
    public id: InstructionId = uuidv4(),
  ) {}

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
