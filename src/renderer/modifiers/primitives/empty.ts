import { Primitive } from "./index.ts";
import { InstructionId, NoParams, Render } from "../../types.ts";
import render from "../render.ts";

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

export default class Empty extends Primitive {
  params: EmptyParams;

  constructor(id?: InstructionId) {
    super(id);
    this.params = {};
  }

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
