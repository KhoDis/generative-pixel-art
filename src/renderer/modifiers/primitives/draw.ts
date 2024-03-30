import { InstructionId, Placement, Render } from "../../types.ts";
import render from "../render.ts";
import { Primitive } from "./index.ts";

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

export default class Draw extends Primitive {
  params: DrawParams;

  constructor(params: DrawParams, id?: InstructionId) {
    super(id);
    this.params = params;
  }

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
