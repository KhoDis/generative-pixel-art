import Fill, { FillInstruction } from "./fill.ts";
import Outline, { OutlineInstruction } from "./outline.ts";
import { Render, Shape } from "../../types.ts";

export { Fill, Outline };

export default { Fill, Outline };

export type PaintingInstruction = FillInstruction | OutlineInstruction;

export abstract class Painting implements Shape {
  shape: Shape;

  protected constructor(shape: Shape) {
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): PaintingInstruction;
}
