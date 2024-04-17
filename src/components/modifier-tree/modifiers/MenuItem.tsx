import { Instruction } from "../../../renderer/types.ts";
import EmptyMenuItem from "./empty/EmptyMenuItem.tsx";
import { ReactNode } from "react";
import { Circle, Empty } from "../../../renderer/modifiers/primitives";
import CircleMenuItem from "./circle/CircleMenuItem.tsx";
import { CircleInstruction } from "../../../renderer/modifiers/primitives/circle.ts";

interface ModifierProps {
  instruction: Instruction;
}

export default function MenuItem({ instruction }: ModifierProps) {
  if (instruction.type.modifier === "empty") {
    return <EmptyMenuItem shape={new Empty(instruction.id)} />;
  } else if (instruction.type.modifier === "circle") {
    const instr: CircleInstruction = instruction;
    return <CircleMenuItem shape={new Circle(instr.params, instruction.id)} />;
  } else {
    return null;
  }
}