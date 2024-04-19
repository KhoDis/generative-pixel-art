import {
  InstructionId,
  NoParams,
  Placement,
  Render,
  Shape,
} from "../../types.ts";
import { place, createRender } from "../index.ts";
import { v4 as uuidv4 } from "uuid";

export type TrimParams = NoParams;

export type TrimInstruction = {
  id: InstructionId;
  parentId?: InstructionId;
  category: "cleaning";
  modifier: "trim";
  params: TrimParams;
  children: [InstructionId];
};

export default class Trim implements Shape {
  constructor(
    public shape: Shape,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const { pixels } = this.shape.render();

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const { position } of pixels) {
      const { x, y } = position;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }

    const trimmed: Placement[] = [];

    for (const { position, pixel } of pixels) {
      const { x, y } = position;
      trimmed.push(place(pixel, x - minX, y - minY));
    }

    return createRender(trimmed);
  }

  toInstruction(): TrimInstruction {
    return {
      id: this.id,
      category: "cleaning",
      modifier: "trim",
      params: {},
      children: [this.shape.toInstruction().id],
    };
  }
}
