import {
  MakeInstruction,
  NoParams,
  Nullary,
  Primitive,
} from "../../../../renderer/types.ts";

export type EmptyInstruction = MakeInstruction<
  "empty",
  NoParams,
  Primitive,
  Nullary
>;
