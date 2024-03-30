import { Builder } from "./index.ts";
import {
  InstructionId,
  NoParams,
  Placement,
  Render,
  Shape,
} from "../../types.ts";
import render from "../render.ts";
import { v4 as uuidv4 } from "uuid";

export type CombineParams = NoParams;

export type CombineInstruction = {
  id: InstructionId;
  type: {
    category: "builder";
    modifier: "combine";
  };
  params: CombineParams;
  children: InstructionId[];
};

export default class Combine implements Builder {
  id: InstructionId = uuidv4();
  shapes: Shape[];

  constructor(shapes: Shape[], id: InstructionId = uuidv4()) {
    this.id = id;
    this.shapes = shapes;
  }

  toInstruction(): CombineInstruction {
    return {
      id: this.id,
      type: {
        category: "builder",
        modifier: "combine",
      },
      params: {},
      children: this.shapes.map((shape) => shape.toInstruction().id),
    };
  }

  render(): Render {
    const pixels: Placement[] = [];
    for (const shape of this.shapes) {
      pixels.push(...shape.render().pixels);
    }
    return render(pixels);
  }
}
