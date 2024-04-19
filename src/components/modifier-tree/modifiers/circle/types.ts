import {
  Color,
  MakeInstruction,
  Nullary,
  Primitive,
} from "../../../../renderer/types.ts";

export type CircleParams = {
  radius: number;
  color: Color;
};

export type CircleInstruction = MakeInstruction<
  "circle",
  CircleParams,
  Primitive,
  Nullary
>;
