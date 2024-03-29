import { Placement, Render } from "../../types.ts";
import shape from "../../factories/shape.ts";
import { Primitive } from "./index.ts";

export type DrawParams = {
  placements: Placement[];
};

export type DrawInstruction = {
  type: {
    category: "primitive";
    modifier: "draw";
  };
  params: DrawParams;
  children: [];
};

export default class Draw implements Primitive {
  params: DrawParams;

  constructor(...placements: Placement[]) {
    this.params = { placements };
  }

  render(): Render {
    return shape(this.params.placements);
  }

  toInstruction(): DrawInstruction {
    return {
      type: {
        category: "primitive",
        modifier: "draw",
      },
      params: this.params,
      children: [],
    };
  }
}
