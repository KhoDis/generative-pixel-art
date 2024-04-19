import { InstructionId, NoParams, Render, Shape } from "../../types.ts";
import createRender from "../createRender.ts";
import { v4 as uuidv4 } from "uuid";

export type EmptyParams = NoParams;

export type EmptyInstruction = {
  id: InstructionId;
  parentId?: InstructionId;
  category: "primitive";
  modifier: "empty";
  params: EmptyParams;
  children: [];
};

export default class Empty implements Shape {
  constructor(public id: InstructionId = uuidv4()) {}

  render(): Render {
    return createRender([]);
  }

  toInstruction(): EmptyInstruction {
    return {
      id: this.id,
      category: "primitive",
      modifier: "empty",
      params: {},
      children: [],
    };
  }
}
