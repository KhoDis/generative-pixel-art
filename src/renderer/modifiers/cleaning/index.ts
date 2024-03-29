import RemoveTransparent, {
  RemoveTransparentInstruction,
} from "./removeTransparent.ts";
import Trim, { TrimInstruction } from "./trim.ts";
import { Render, Shape } from "../../types.ts";

export { RemoveTransparent, Trim };

export default { RemoveTransparent, Trim };

export type CleaningInstruction =
  | RemoveTransparentInstruction
  | TrimInstruction;

export abstract class Cleaning implements Shape {
  shape: Shape;

  protected constructor(shape: Shape) {
    this.shape = shape;
  }

  abstract render(): Render;
  abstract toInstruction(): CleaningInstruction;
}
