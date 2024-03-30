import Fill, { FillInstruction } from "./fill.ts";
import Outline, { OutlineInstruction } from "./outline.ts";

export { Fill, Outline };

export default { Fill, Outline };

export type PaintingInstruction = FillInstruction | OutlineInstruction;
