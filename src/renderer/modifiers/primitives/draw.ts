import { InstructionId, Placement, Render, Shape } from "../../types.ts";
import createRender from "../createRender.ts";
import { v4 as uuidv4 } from "uuid";

export type DrawParams = {
  placements: Placement[];
};

export type DrawInstruction = {
  id: InstructionId;
  parentId?: InstructionId;
  category: "primitive";
  modifier: "draw";
  params: DrawParams;
  children: [];
};

export default class Draw implements Shape {
  constructor(
    public params: DrawParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    return createRender(this.params.placements);
  }

  toInstruction(): DrawInstruction {
    return {
      id: this.id,
      category: "primitive",
      modifier: "draw",
      params: this.params,
      children: [],
    };
  }
}
