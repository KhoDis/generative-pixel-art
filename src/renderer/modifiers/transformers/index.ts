import Flip, { FlipInstruction } from "./flip.ts";
import Reset, { ResetInstruction } from "./reset.ts";
import Rotate, { RotateInstruction } from "./rotate.ts";
import Translate, { TranslateInstruction } from "./translate.ts";
import { Shape, Render } from "../../types.ts";

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
  shape: Shape;

  protected constructor(shape: Shape) {
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): TransformerInstruction;
}
