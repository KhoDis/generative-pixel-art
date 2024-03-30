import RemoveTransparent, {
  RemoveTransparentInstruction,
} from "./removeTransparent.ts";
import Trim, { TrimInstruction } from "./trim.ts";

export { RemoveTransparent, Trim };

export default { RemoveTransparent, Trim };

export type CleaningInstruction =
  | RemoveTransparentInstruction
  | TrimInstruction;
