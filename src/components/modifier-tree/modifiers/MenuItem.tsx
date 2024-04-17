import { Instruction } from "../../../renderer/types.ts";
import EmptyMenuItem from "./empty/EmptyMenuItem.tsx";
import { Circle, Empty } from "../../../renderer/modifiers/primitives";
import CircleMenuItem from "./circle/CircleMenuItem.tsx";

interface ModifierProps {
  instruction: Instruction;
}

export default function MenuItem({ instruction }: ModifierProps) {
  if (instruction.modifier === "empty") {
    return <EmptyMenuItem shape={new Empty(instruction.id)} />;
  } else if (instruction.modifier === "circle") {
    return <CircleMenuItem shape={new Circle(instruction.params, instruction.id)} />;
  } else {
    return null;
  }
}
