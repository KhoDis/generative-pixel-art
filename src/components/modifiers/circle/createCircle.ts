import { InstructionId } from "../../../renderer/types.ts";
import { v4 as uuidv4 } from "uuid";
import { CircleInstruction, CircleParams } from "./types.ts";

export default function createCircle(
  id: InstructionId = uuidv4(),
  params: CircleParams = {
    diameter: 5,
    color: { r: 255, g: 0, b: 0, a: 1 },
    pivot: { x: 0, y: 0 },
  },
): CircleInstruction {
  return {
    id,
    category: "primitive",
    modifier: "circle",
    params,
    arity: "nullary",
    children: [],
  };
}
