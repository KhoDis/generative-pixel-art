import { BuilderInstruction } from "./builders.ts";
import { CleaningInstruction } from "./cleaning.ts";
import { PaintingInstruction } from "./painting.ts";
import { PrimitiveInstruction } from "./primitives.ts";
import { TransformerInstruction } from "./transformers.ts";

export type ShapeInstruction =
  | PrimitiveInstruction
  | PaintingInstruction
  | TransformerInstruction
  | CleaningInstruction;

export type GroupInstruction = BuilderInstruction;
