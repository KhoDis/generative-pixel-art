import { Instruction } from "../../../renderer/types.ts";
import EmptyMenuItem from "./empty/EmptyMenuItem.tsx";
import { ReactNode } from "react";
import { Empty } from "../../../renderer/modifiers/primitives";

interface ModifierProps {
  instruction: Instruction;
}

export default function Modifier({ instruction }: ModifierProps) {
  const instructionTypeToComponent: Record<
    Instruction["type"]["modifier"],
    ReactNode | null
  > = {
    empty: <EmptyMenuItem shape={new Empty()} />,
    combine: null,
    removeTransparent: null,
    trim: null,
    fill: null,
    outline: null,
    circle: null,
    draw: null,
    line: null,
    pixel: null,
    polygon: null,
    rect: null,
    flip: null,
    rotate: null,
    reset: null,
    translate: null,
  };

  const Component = instructionTypeToComponent[instruction.type.modifier];
  if (Component) {
    return Component;
  } else {
    throw new Error(`Unknown instruction type: ${instruction.type.modifier}`);
  }
}
