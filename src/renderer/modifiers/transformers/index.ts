import Flip, { FlipInstruction } from "./flip.ts";
import Reset, { ResetInstruction } from "./reset.ts";
import Rotate, { RotateInstruction } from "./rotate.ts";
import Translate, { TranslateInstruction } from "./translate.ts";

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
