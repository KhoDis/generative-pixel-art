import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectInstruction,
  selectSelectedInstructionId,
} from "../../../redux/slice.ts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { InstructionId } from "../../../renderer/types.ts";

export default function CircleMenuItem({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  const dispatch = useAppDispatch();
  const selectedModifier = useAppSelector((state) =>
    selectSelectedInstructionId(state),
  );

  return (
    <a
      className={instructionId === selectedModifier ? "active" : ""}
      onClick={() => dispatch(selectInstruction(instructionId))}
    >
      <PlusCircleIcon className="w-5 h-5" />
      Circle
    </a>
  );
}
