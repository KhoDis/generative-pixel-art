import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectInstruction,
  selectInstructionById,
  selectSelectedInstructionId,
} from "../../../redux/slice.ts";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { InstructionId } from "../../../renderer/types.ts";
import MenuItem from "../MenuItem.tsx";

export default function TranslateMenuItem({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  const dispatch = useAppDispatch();
  const currentInstruction = useAppSelector((state) =>
    selectInstructionById(state, instructionId),
  );
  const selectedInstructionId = useAppSelector((state) =>
    selectSelectedInstructionId(state),
  );

  return (
    <>
      <a
        className={instructionId === selectedInstructionId ? "active" : ""}
        onClick={() => dispatch(selectInstruction(instructionId))}
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
        Translate
      </a>
      <ul>
        {currentInstruction?.children.map((childId) => (
          <li key={childId}>
            <MenuItem instructionId={childId} />
          </li>
        ))}
      </ul>
    </>
  );
}
