import { FigureInstruction, Point } from "../types.ts";

export type CombineInstruction = {
  type: "builder/combine";
  figures: FigureInstruction[];
  anchor: Point;
};

export function combine(
  figures: FigureInstruction[],
  anchor: Point = { x: 0, y: 0 },
): CombineInstruction {
  return { type: "builder/combine", figures, anchor };
}

export type MoveInstruction = {
  type: "builder/move";
  figure: FigureInstruction;
  offset: Point;
};

export function move(
  figure: FigureInstruction,
  offset: Point = { x: 0, y: 0 },
): MoveInstruction {
  return { type: "builder/move", figure, offset };
}

export type BuilderInstruction = CombineInstruction | MoveInstruction;
