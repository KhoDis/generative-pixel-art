import { FigureInstruction, Pivot, Point } from "../types.ts";
import { FlipMode } from "../modifiers/transformers/flip.ts";
import { RotationMode } from "../modifiers/transformers/rotate.ts";
import { ShapeInstruction } from "./index.ts";

export type FlattenInstruction = {
  type: "transformer/flatten";
  figure: FigureInstruction;
};

export function flatten(figure: FigureInstruction): FlattenInstruction {
  return { type: "transformer/flatten", figure };
}

export type FlipInstruction = {
  type: "transformer/flip";
  shape: ShapeInstruction;
  axis: FlipMode;
  anchor: Point;
};

export function flip(
  shape: ShapeInstruction,
  axis: FlipMode,
  anchor: Point = { x: 0, y: 0 },
): FlipInstruction {
  return { type: "transformer/flip", shape, axis, anchor };
}

export type ResetInstruction = {
  type: "transformer/reset";
  shape: ShapeInstruction;
  pivot: Pivot;
};

export function reset(shape: ShapeInstruction, pivot: Pivot): ResetInstruction {
  return { type: "transformer/reset", shape, pivot };
}

export type RotateInstruction = {
  type: "transformer/rotate";
  shape: ShapeInstruction;
  anchor: Point;
  mode: RotationMode;
};

export function rotate(
  shape: ShapeInstruction,
  anchor: Point,
  mode: RotationMode = "none",
): RotateInstruction {
  return { type: "transformer/rotate", shape, anchor, mode };
}

export type TranslateInstruction = {
  type: "transformer/translate";
  shape: ShapeInstruction;
  offset: Point;
};

export function translate(
  shape: ShapeInstruction,
  offset: Point = { x: 0, y: 0 },
): TranslateInstruction {
  return { type: "transformer/translate", shape, offset };
}

export type TrimInstruction = {
  type: "transformer/trim";
  shape: ShapeInstruction;
};

export function trim(shape: ShapeInstruction): TrimInstruction {
  return { type: "transformer/trim", shape };
}

export type TransformerInstruction =
  | FlattenInstruction
  | ResetInstruction
  | FlipInstruction
  | RotateInstruction
  | TrimInstruction;
