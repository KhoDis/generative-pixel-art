import { Color, Point } from "../types.ts";
import { OutlineMode } from "../modifiers/painting/outline.ts";
import { ShapeInstruction } from "./index.ts";
import { TraversalMode } from "../modifiers/painting/fill.ts";

export type FillInstruction = {
  type: "painting/fill";
  shape: ShapeInstruction;
  start: Point;
  color: Color;
  mode: TraversalMode;
};

export function fill(
  shape: ShapeInstruction,
  start: Point,
  color: Color,
  mode: TraversalMode = "straightOnly",
): FillInstruction {
  return { type: "painting/fill", start, color, mode, shape };
}

export type OutlineInstruction = {
  type: "painting/outline";
  shape: ShapeInstruction;
  color: Color;
  mode: OutlineMode;
};

export function outline(
  shape: ShapeInstruction,
  color: Color,
  mode: OutlineMode = "corners",
): OutlineInstruction {
  return { type: "painting/outline", shape, color, mode };
}

export type PaintingInstruction = FillInstruction | OutlineInstruction;
