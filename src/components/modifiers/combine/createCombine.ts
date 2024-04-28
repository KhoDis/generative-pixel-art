import { InstructionId } from "../../../renderer/types.ts";
import { v4 as uuidv4 } from "uuid";
import { CombineInstruction } from "./types.ts";

export default function createCombine(
  id: InstructionId = uuidv4(),
  children: InstructionId[] = [],
): CombineInstruction {
  return {
    id,
    category: "builder",
    modifier: "combine",
    params: {},
    arity: "variadic",
    children: [...children],
  };
}
