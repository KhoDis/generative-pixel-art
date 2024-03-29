import { Placement, Point, Render, Shape } from "../../types.ts";
import { Transformer } from "./index.ts";
import { shape } from "../../factories";

export type FlipMode = "x" | "y" | "xy";

export type FlipParams = {
  axis: FlipMode;
  anchor: Point;
};

export type FlipInstruction = {
  type: {
    category: "transformer";
    modifier: "flip";
  };
  params: FlipParams;
  children: [];
};

export default class Flip extends Transformer {
  params: FlipParams;

  constructor({ shape, axis, anchor }: FlipParams & { shape: Shape }) {
    super(shape);
    this.params = { axis, anchor };
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

    return shape(pixels);
  }

  toInstruction(): FlipInstruction {
    return {
      type: {
        category: "transformer",
        modifier: "flip",
      },
      params: this.params,
      children: [],
    };
  }
}
