import { InstructionId } from "../../renderer/types.ts";
import MenuItem from "./MenuItem.tsx";

export default function InstructionTree({ root }: { root: InstructionId }) {
  return (
    <ul className="menu">
      <li>
        <MenuItem instructionId={root} />
      </li>
    </ul>
  );
}