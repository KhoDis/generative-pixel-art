import Fill, { FillInstruction } from "./fill.ts";
import Outline, { OutlineInstruction } from "./outline.ts";
import { InstructionId, Render, Shape } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";

export { Fill, Outline };

export default { Fill, Outline };

export type PaintingInstruction = FillInstruction | OutlineInstruction;

export abstract class Painting implements Shape {
  id: InstructionId;
  shape: Shape;

  protected constructor(shape: Shape, id: InstructionId = uuidv4()) {
    this.id = id;
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): PaintingInstruction;
}
