import { Instruction, Placement, Render, Shape } from "../../types.ts";
import { Cleaning } from "./index.ts";
import { place, shape } from "../../factories";

export type TrimParams = Record<string, never>;

export type TrimInstruction = {
  type: {
    category: "cleaning";
    modifier: "trim";
  };
  params: TrimParams;
  children: [Instruction];
};

export default class Trim extends Cleaning {
  constructor({ shape }: TrimParams & { shape: Shape }) {
    super(shape);
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

    return shape(trimmed);
  }

  toInstruction(): TrimInstruction {
    return {
      type: {
        category: "cleaning",
        modifier: "trim",
      },
      params: {},
      children: [this.shape.toInstruction()],
    };
  }
}
