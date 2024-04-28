import { DocumentIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectInstruction,
  selectSelectedInstructionId,
} from "../../../redux/slice.ts";
import { InstructionId } from "../../../renderer/types.ts";

export default function EmptyMenuItem({
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
      <DocumentIcon className="w-5 h-5" />
      Empty
    </a>
  );
}
