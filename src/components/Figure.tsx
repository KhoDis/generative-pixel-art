import { Instruction } from "../renderer/types.ts";
import { ReactNode } from "react";
import {
  RectangleGroupIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";

export function Figure({
  name,
  instruction,
}: {
  name: string;
  instruction: Instruction;
}) {
  const instructionToComponent = (instruction: Instruction): ReactNode => {
    if (instruction.children.length > 0) {
      return (
        <li>
          <details>
            <summary>
              <RectangleGroupIcon className="w-5 h-5" />
              {instruction.type.modifier}
            </summary>
            <ul className="menu">
              {instruction.children.map((child) =>
                instructionToComponent(child),
              )}
            </ul>
          </details>
        </li>
      );
    } else {
      return (
        <li>
          <a>
            <Square2StackIcon className="w-5 h-5" />
            {instruction.type.modifier}
          </a>
        </li>
      );
    }
  };

  return <ul className="menu">{instructionToComponent(instruction)}</ul>;
}
