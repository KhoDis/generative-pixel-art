import { InstructionId, Placement, Point, Render, Shape } from "../../types.ts";
import { Transformer } from "./index.ts";
import { render } from "../index.ts";

export type FlipMode = "x" | "y" | "xy";

export type FlipParams = {
  axis: FlipMode;
  anchor: Point;
};

export type FlipInstruction = {
  id: InstructionId;
  type: {
    category: "transformer";
    modifier: "flip";
  };
  params: FlipParams;
  children: [InstructionId];
};

export default class Flip extends Transformer {
  params: FlipParams;

  constructor(shape: Shape, params: FlipParams, id?: InstructionId) {
    super(shape, id);
    this.params = params;
  }

  render(): Render {
    const pixels: Placement[] = [];
    const { axis, anchor } = this.params;

    // Yes, this is a lot of code duplication, but it's the fastest way to do it.
    if (axis === "x") {
      for (const { position, pixel } of this.shape.render().pixels) {
        pixels.push({
          position: { ...position, y: 2 * anchor.y - position.y },
          pixel,
        });
      }
    } else if (axis === "y") {
      for (const { position, pixel } of this.shape.render().pixels) {
        pixels.push({
          position: { ...position, x: 2 * anchor.x - position.x },
          pixel,
        });
      }
    } else if (axis === "xy") {
      for (const { position, pixel } of this.shape.render().pixels) {
        pixels.push({
          position: {
            x: 2 * anchor.x - position.x,
            y: 2 * anchor.y - position.y,
          },
          pixel,
        });
      }
    }

    return render(pixels);
  }

  toInstruction(): FlipInstruction {
    return {
      id: this.id,
      type: {
        category: "transformer",
        modifier: "flip",
      },
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
