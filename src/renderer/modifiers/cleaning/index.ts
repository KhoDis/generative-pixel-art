import RemoveTransparent, {
  RemoveTransparentInstruction,
} from "./removeTransparent.ts";
import Trim, { TrimInstruction } from "./trim.ts";
import { InstructionId, Render, Shape } from "../../types.ts";
import { v4 as uuidv4 } from "uuid";

export { RemoveTransparent, Trim };

export default { RemoveTransparent, Trim };

export type CleaningInstruction =
  | RemoveTransparentInstruction
  | TrimInstruction;

export abstract class Cleaning implements Shape {
  id: InstructionId;
  shape: Shape;

  protected constructor(shape: Shape, id = uuidv4()) {
    this.id = id;
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): CleaningInstruction;
}
