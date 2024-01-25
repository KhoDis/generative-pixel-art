import { ShapeInstruction } from "./index.ts";

export type RemoveTransparentInstruction = {
  type: "cleaning/removeTransparent";
  shape: ShapeInstruction;
};

export function removeTransparent(
  shape: ShapeInstruction,
): RemoveTransparentInstruction {
  return { type: "cleaning/removeTransparent", shape };
}

export type CleaningInstruction = RemoveTransparentInstruction;
