import { InstructionId } from "../../renderer/types.ts";
// import { ReactNode } from "react";
// import {
//   RectangleGroupIcon,
//   Square2StackIcon,
// } from "@heroicons/react/24/outline";
import { useAppSelector } from "../../redux/hooks.ts";
import { selectInstructionById } from "../../redux/slice.ts";
import Modifier from "./modifiers/Modifier.tsx";

export function Figure({ root }: { root: InstructionId }) {
  const instruction = useAppSelector((state) =>
    selectInstructionById(state, root),
  );

  return (
    <ul className="menu">
      <Modifier instruction={instruction} />
    </ul>
  );

  // const instructionToComponent = (instruction: Instruction): ReactNode => {
  //   if (instruction.children.length > 0) {
  //     return (
  //       <li>
  //         <details>
  //           <summary>
  //             <RectangleGroupIcon className="w-5 h-5" />
  //             {instruction.type.modifier}
  //           </summary>
  //           <ul className="menu">
  //             {instruction.children.map((child) =>
  //               instructionToComponent(child),
  //             )}
  //           </ul>
  //         </details>
  //       </li>
  //     );
  //   } else {
  //     return (
  //       <li>
  //         <a>
  //           <Square2StackIcon className="w-5 h-5" />
  //           {instruction.type.modifier}
  //         </a>
  //       </li>
  //     );
  //   }
  // };

  // return <ul className="menu">{instructionToComponent(instruction)}</ul>;

  return <div>Figure</div>;
}
