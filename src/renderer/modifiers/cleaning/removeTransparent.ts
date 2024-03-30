import {
  InstructionId,
  NoParams,
  Placement,
  Render,
  Shape,
} from "../../types.ts";
import render from "../render.ts";
import { Cleaning } from "./index.ts";

export type RemoveTransparentParams = NoParams;

export type RemoveTransparentInstruction = {
  id: InstructionId;
  type: {
    category: "cleaning";
    returns: "shape";
    modifier: "removeTransparent";
  };
  params: RemoveTransparentParams;
  children: [InstructionId];
};

export default class RemoveTransparent extends Cleaning {
  constructor(shape: Shape, id?: InstructionId) {
    super(shape, id);
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
      id: this.id,
      type: {
        category: "cleaning",
        returns: "shape",
        modifier: "removeTransparent",
      },
      params: {},
      children: [this.shape.toInstruction().id],
    };
  }
}
