import {
  MakeInstruction,
  Point,
  Transformer,
  Unary,
} from "../../../renderer/types.ts";

export type TranslateParams = {
  offset: Point;
};

export type TranslateInstruction = MakeInstruction<
  "translate",
  TranslateParams,
  Transformer,
  Unary
>;
