import {
  Builder,
  MakeInstruction,
  NoParams,
  Variadic,
} from "../../../../renderer/types.ts";

export type CombineInstruction = MakeInstruction<
  "combine",
  NoParams,
  Builder,
  Variadic
>;
