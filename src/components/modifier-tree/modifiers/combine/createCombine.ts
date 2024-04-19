import { InstructionId } from "../../../../renderer/types.ts";
import { v4 as uuidv4 } from "uuid";
import { CombineInstruction } from "../../../../renderer/modifiers/builders/combine.ts";

export default function createCombine(
  id: InstructionId = uuidv4(),
  children: InstructionId[] = [],
): CombineInstruction {
  return {
    id,
    category: "builder",
    modifier: "combine",
    params: {},
    children: [...children],
  };
}
