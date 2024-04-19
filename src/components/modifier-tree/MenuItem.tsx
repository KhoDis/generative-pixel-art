import { InstructionId } from "../../renderer/types.ts";
import EmptyMenuItem from "./modifiers/empty/EmptyMenuItem.tsx";
import CircleMenuItem from "./modifiers/circle/CircleMenuItem.tsx";
import CombineMenuItem from "./modifiers/combine/CombineMenuItem.tsx";
import {
  selectAllInstructions,
  selectInstructionById,
} from "../../redux/slice.ts";
import { useAppSelector } from "../../redux/hooks.ts";

interface ModifierProps {
  instructionId: InstructionId;
}

export default function MenuItem({ instructionId }: ModifierProps) {
  const instruction = useAppSelector((state) =>
    selectInstructionById(state, instructionId),
  );
  console.log(
    "MenuItem",
    instructionId,
    instruction,
    useAppSelector((state) => selectAllInstructions(state)),
  );

  switch (instruction.modifier) {
    case "empty":
      return <EmptyMenuItem instructionId={instruction.id} />;
    case "circle":
      return <CircleMenuItem instructionId={instruction.id} />;
    case "combine":
      return <CombineMenuItem instructionId={instruction.id} />;
    default:
      return null;
  }
}
