import { InstructionId, Placement, Point, Render, Shape } from "../../types.ts";
import { Transformer } from "./index.ts";
import { place, render } from "../index.ts";

export type TranslateParams = {
  offset: Point;
};

export type TranslateInstruction = {
  id: InstructionId;
  type: {
    category: "transformer";
    modifier: "translate";
  };
  params: TranslateParams;
  children: [InstructionId];
};

export default class Translate extends Transformer {
  params: TranslateParams;

  constructor(
    shape: Shape,
    { offset = { x: 0, y: 0 } }: TranslateParams,
    id?: InstructionId,
  ) {
    super(shape, id);
    this.params = { offset };
  }

  render(): Render {
    const pixels: Placement[] = [];
    const { offset } = this.params;

    for (const { position, pixel } of this.shape.render().pixels) {
      const newX = position.x + offset.x;
      const newY = position.y + offset.y;
      pixels.push(place(pixel, newX, newY));
    }

    return render(pixels);
  }

  toInstruction(): TranslateInstruction {
    return {
      id: this.id,
      type: {
        category: "transformer",
        modifier: "translate",
      },
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
