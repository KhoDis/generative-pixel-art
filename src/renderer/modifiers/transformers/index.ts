import Flip, { FlipInstruction } from "./flip.ts";
import Reset, { ResetInstruction } from "./reset.ts";
import Rotate, { RotateInstruction } from "./rotate.ts";

export { Flip, Reset, Rotate };

export default {
  Flip,
  Reset,
  Rotate,
};

export type TransformerInstruction =
  | FlipInstruction
  | ResetInstruction
  | RotateInstruction;
