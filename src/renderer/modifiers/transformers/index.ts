import Flip, { FlipInstruction } from "./flip.ts";
import Reset, { ResetInstruction } from "./reset.ts";
import Rotate, { RotateInstruction } from "./rotate.ts";
import Translate, { TranslateInstruction } from "./translate.ts";
import { Shape, Render, InstructionId } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";

export { Flip, Reset, Rotate, Translate };

export default {
  Flip,
  Reset,
  Rotate,
  Translate,
};

export type TransformerInstruction =
  | FlipInstruction
  | ResetInstruction
  | RotateInstruction
  | TranslateInstruction;

export abstract class Transformer implements Shape {
  id: InstructionId;
  shape: Shape;

  protected constructor(shape: Shape, id: InstructionId = uuidv4()) {
    this.id = id;
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): TransformerInstruction;
}
