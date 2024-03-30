import {
  InstructionId,
  NoParams,
  Placement,
  Render,
  Shape,
} from "../../types.ts";
import { Cleaning } from "./index.ts";
import { place, render } from "../index.ts";

export type TrimParams = NoParams;

export type TrimInstruction = {
  id: InstructionId;
  type: {
    category: "cleaning";
    modifier: "trim";
  };
  params: TrimParams;
  children: [InstructionId];
};

export default class Trim extends Cleaning {
  constructor(shape: Shape, id: InstructionId) {
    super(shape, id);
  }

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

    return render(trimmed);
  }

  toInstruction(): TrimInstruction {
    return {
      id: this.id,
      type: {
        category: "cleaning",
        modifier: "trim",
      },
      params: {},
      children: [this.shape.toInstruction().id],
    };
  }
}
