import {
  MakeInstruction,
  Nullary,
  Pivot,
  Primitive,
} from "../../../renderer/types.ts";
import { Color } from "../../../renderer/colors.ts";

export type CircleParams = {
  pivot: Pivot;
  diameter: number;
  color: Color;
};

export type CircleInstruction = MakeInstruction<
  "circle",
  CircleParams,
  Primitive,
  Nullary
>;
