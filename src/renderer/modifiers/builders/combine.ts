import { Builder } from "./index.ts";
import { Instruction, Placement, Render, Shape } from "../../types.ts";
import { Draw } from "../primitives";

export type CombineParams = Record<string, never>;

export type CombineInstruction = {
  type: {
    category: "builder";
    modifier: "combine";
  };
  params: CombineParams;
  children: Instruction[];
};

export default class Combine implements Builder {
  shapes: Shape[];

  constructor(...shapes: Shape[]) {
    this.shapes = shapes;
  }

  toInstruction(): CombineInstruction {
    return {
      type: {
        category: "builder",
        modifier: "combine",
      },
      params: {},
      children: this.shapes.map((shape) => shape.toInstruction()),
    };
  }

  render(): Render {
    const pixels: Placement[] = [];
    for (const shape of this.shapes) {
      pixels.push(...shape.render().pixels);
    }
    return new Draw(...pixels).render();
  }
}
