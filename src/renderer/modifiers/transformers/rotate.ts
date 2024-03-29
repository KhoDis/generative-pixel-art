import { Instruction, Placement, Point, Render, Shape } from "../../types.ts";
import { Transformer } from "./index.ts";
import { place, render } from "../index.ts";

export type RotationMode = "90cw" | "90ccw" | "180" | "none";

export type RotateParams = {
  anchor: Point;
  mode: RotationMode;
};

export type RotateInstruction = {
  type: {
    category: "transformer";
    modifier: "rotate";
  };
  params: RotateParams;
  children: [Instruction];
};

export default class Rotate extends Transformer {
  params: RotateParams;

  constructor({
    shape,
    anchor,
    mode = "none",
  }: RotateParams & { shape: Shape }) {
    super(shape);
    this.params = { anchor, mode };
  }

  render(): Render {
    const placements: Placement[] = [];
    const { anchor, mode } = this.params;

    // Yes, this is a lot of code duplication, but it's the fastest way to do it.
    if (mode === "90cw") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = anchor.y + position.y - anchor.x;
        const newY = anchor.x + anchor.y - position.x;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "90ccw") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = anchor.x + anchor.y - position.y;
        const newY = anchor.y + position.x - anchor.x;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "180") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = 2 * anchor.x - position.x;
        const newY = 2 * anchor.y - position.y;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "none") {
      for (const { position, pixel } of this.shape.render().pixels) {
        placements.push(place(pixel, position.x, position.y));
      }
    }

    return render(placements);
  }

  toInstruction(): RotateInstruction {
    return {
      type: {
        category: "transformer",
        modifier: "rotate",
      },
      params: this.params,
      children: [this.shape.toInstruction()],
    };
  }
}
