import { InstructionId } from "../../renderer/types.ts";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
  selectInstruction,
  selectInstructionById,
  selectSelectedInstructionId,
} from "../../redux/slice.ts";
import MenuItem from "./MenuItem.tsx";

export default function BaseMenuItem({
  instructionId,
  icon,
  name,
}: {
  instructionId: InstructionId;
  icon: ReactNode;
  name: string;
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
        {icon}
        {name}
      </a>
      {currentInstruction?.children.length > 0 && (
        <ul>
          {currentInstruction?.children.map((childId) => (
            <li key={childId}>
              <MenuItem instructionId={childId} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
