import { InstructionId } from "../../../../renderer/types.ts";
import { v4 as uuidv4 } from "uuid";
import { EmptyInstruction } from "../../../../renderer/modifiers/primitives/empty.ts";

export default function createEmpty(
  id: InstructionId = uuidv4(),
): EmptyInstruction {
  return {
    id,
    category: "primitive",
    modifier: "empty",
    params: {},
    children: [],
  };
}
