import { Instruction } from "../../../renderer/types.ts";
import EmptyMenuItem from "./empty/EmptyMenuItem.tsx";
import { ReactNode } from "react";
import { Circle, Empty } from "../../../renderer/modifiers/primitives";
import { CircleReplacer } from "./circle/CircleReplacer.tsx";

interface ModifierProps {
  instruction: Instruction;
}

export default function Replacer({ instruction }: ModifierProps) {
  const instructionTypeToComponent: Record<
    Instruction["type"]["modifier"],
    ReactNode | null
  > = {
    empty: null,
    combine: null,
    removeTransparent: null,
    trim: null,
    fill: null,
    outline: null,
    circle: <CircleReplacer shape={new Circle(undefined, instruction.id)} />,
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
