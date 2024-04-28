import {
  MakeInstruction,
  Nullary,
  Primitive,
} from "../../../renderer/types.ts";
import { Color } from "../../../renderer/colors.ts";

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
