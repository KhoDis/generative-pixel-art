import {
  InstructionId,
  NoParams,
  Placement,
  Render,
  Shape,
} from "../../types.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

export type RemoveTransparentParams = NoParams;

export type RemoveTransparentInstruction = {
  id: InstructionId;
  category: "cleaning";
  modifier: "removeTransparent";
  params: RemoveTransparentParams;
  children: [InstructionId];
};

export default class RemoveTransparent implements Shape {
  constructor(
    public shape: Shape,
    public id: InstructionId = uuidv4(),
  ) {}

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
      category: "cleaning",
      modifier: "removeTransparent",
      params: {},
      children: [this.shape.toInstruction().id],
    };
  }
}
