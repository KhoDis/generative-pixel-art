import { InstructionId, NoParams, Render, Shape } from "../../types.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

export type EmptyParams = NoParams;

export type EmptyInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "empty";
  };
  params: EmptyParams;
  children: [];
};

export default class Empty implements Shape {
  constructor(
    public params: EmptyParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    return render([]);
  }

  toInstruction(): EmptyInstruction {
    return {
      id: this.id,
      type: {
        category: "primitive",
        modifier: "empty",
      },
      params: this.params,
      children: [],
    };
  }
}
