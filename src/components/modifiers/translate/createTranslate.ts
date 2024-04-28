import { InstructionId } from "../../../renderer/types.ts";
import { v4 as uuidv4 } from "uuid";
import { TranslateInstruction, TranslateParams } from "./types.ts";

export default function createTranslate(
  id: InstructionId = uuidv4(),
  params: TranslateParams = { offset: { x: 0, y: 0 } },
  child: InstructionId,
): TranslateInstruction {
  return {
    id: id,
    category: "transformer",
    modifier: "translate",
    params: params,
    arity: "unary",
    children: [child],
  };
}
