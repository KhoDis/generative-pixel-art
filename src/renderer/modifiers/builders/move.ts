import { Instruction, Point, Render, Shape } from "../../types.ts";
import { Draw } from "../primitives";
import { Builder } from "./index.ts";

export type MoveParams = {
  offset: Point;
};

export type MoveInstruction = {
  type: {
    category: "builder";
    modifier: "move";
  };
  params: MoveParams;
  children: [Instruction];
};

export default class Move implements Builder {
  params: MoveParams;
  shape: Shape;

  constructor({ offset, shape }: MoveParams & { shape: Shape }) {
    this.params = { offset };
    this.shape = shape;
  }

  render(): Render {
    const { x, y } = this.params.offset;
    const pixels = this.shape.render().pixels.map(({ position, pixel }) => ({
      position: { x: position.x + x, y: position.y + y },
      pixel,
    }));
    return new Draw(...pixels).render();
  }

  toInstruction(): MoveInstruction {
    return {
      type: {
        category: "builder",
        modifier: "move",
      },
      params: this.params,
      children: [this.shape.toInstruction()],
    };
  }
}
