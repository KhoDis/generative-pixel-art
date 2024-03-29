import { Instruction, Placement, Render, Shape } from "../../types.ts";
import render from "../render.ts";
import { Cleaning } from "./index.ts";

export type RemoveTransparentParams = Record<string, never>;

export type RemoveTransparentInstruction = {
  type: {
    category: "cleaning";
    returns: "shape";
    modifier: "removeTransparent";
  };
  params: RemoveTransparentParams;
  children: [Instruction];
};

export default class RemoveTransparent extends Cleaning {
  constructor({ shape }: RemoveTransparentParams & { shape: Shape }) {
    super(shape);
  }

  render(): Render {
    const updated: Placement[] = [];
    for (const { position, pixel } of this.shape.render().pixels) {
      if (pixel.a === 0) continue;
      updated.push({ position, pixel });
    }

    return render(updated);
  }

  toInstruction(): RemoveTransparentInstruction {
    return {
      type: {
        category: "cleaning",
        returns: "shape",
        modifier: "removeTransparent",
      },
      params: {},
      children: [this.shape.toInstruction()],
    };
  }
}
