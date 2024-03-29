import { Color, Render } from "../../types.ts";
import { place } from "../../factories";
import shape from "../../factories/shape.ts";
import { Primitive } from "./index.ts";

export type CircleParams = {
  radius: number;
  color: Color;
};

export type CircleInstruction = {
  type: {
    category: "primitive";
    modifier: "circle";
  };
  params: CircleParams;
  children: [];
};

export default class Circle implements Primitive {
  params: CircleParams;

  constructor(radius: number, color: Color) {
    this.params = { radius, color };
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

    return shape(pixels);
  }

  toInstruction(): CircleInstruction {
    return {
      type: {
        category: "primitive",
        modifier: "circle",
      },
      params: this.params,
      children: [],
    };
  }
}
