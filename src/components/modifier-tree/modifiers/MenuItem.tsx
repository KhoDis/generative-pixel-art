import { Instruction } from "../../../renderer/types.ts";
import EmptyMenuItem from "./empty/EmptyMenuItem.tsx";
import CircleMenuItem from "./circle/CircleMenuItem.tsx";

interface ModifierProps {
  instruction: Instruction;
}

export default function MenuItem({ instruction }: ModifierProps) {
  if (instruction.modifier === "empty") {
    return <EmptyMenuItem instructionId={instruction.id} />;
  } else if (instruction.modifier === "circle") {
    return <CircleMenuItem instructionId={instruction.id} />;
  } else {
    return null;
  }
}
