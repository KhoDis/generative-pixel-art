import { useAppSelector } from "../../redux/hooks.ts";
import {
  selectInstructionById,
  selectSelectedInstructionId,
} from "../../redux/slice.ts";
import { InstructionId } from "../../renderer/types.ts";
import CircleOptions from "./circle/CircleOptions.tsx";

export function NoOptions() {
  return <div className="text-2xl">This instruction has no options</div>;
}

function OptionsImpl({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  const selectedInstruction = useAppSelector((state) =>
    selectInstructionById(state, instructionId),
  );

  switch (selectedInstruction.modifier) {
    case "circle":
      return <CircleOptions />;
    case "empty" || "combine":
      return <NoOptions />;
    default:
      return null;
  }
}

export default function Options() {
  const selectedInstructionId = useAppSelector((state) =>
    selectSelectedInstructionId(state),
  );

  if (!selectedInstructionId) {
    return (
      <div className="text-2xl">Select an instruction to view its options</div>
    );
  }

  return <OptionsImpl instructionId={selectedInstructionId} />;
}
