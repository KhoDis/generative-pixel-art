import { InstructionId, Placement, Point, Render, Shape } from "../../types.ts";
import { place, render } from "../index.ts";
import { v4 as uuidv4 } from "uuid";

export type TranslateParams = {
  offset: Point;
};

export type TranslateInstruction = {
  id: InstructionId;
  category: "transformer";
  modifier: "translate";
  params: TranslateParams;
  children: [InstructionId];
};

export default class Translate implements Shape {
  constructor(
    public params: TranslateParams,
    public shape: Shape,
    public id: InstructionId = uuidv4(),
  ) {}

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
      category: "transformer",
      modifier: "translate",
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
