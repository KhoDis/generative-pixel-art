import { InstructionId, Placement, Render, Shape } from "../../types.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

export type DrawParams = {
  placements: Placement[];
};

export type DrawInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "draw";
  };
  params: DrawParams;
  children: [];
};

export default class Draw implements Shape {
  constructor(
    public params: DrawParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    return render(this.params.placements);
  }

  toInstruction(): DrawInstruction {
    return {
      id: this.id,
      type: {
        category: "primitive",
        modifier: "draw",
      },
      params: this.params,
      children: [],
    };
  }
}
