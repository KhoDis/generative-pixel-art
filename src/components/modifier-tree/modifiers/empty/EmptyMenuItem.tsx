import { DocumentIcon } from "@heroicons/react/24/solid";
import Empty from "../../../../renderer/modifiers/primitives/empty.ts";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.ts";
import { selectInstruction, selectSelectedInstructionId } from "../../../../redux/slice.ts";

export default function EmptyMenuItem({ shape }: { shape: Empty }) {
  const dispatch = useAppDispatch();
  const selectedModifier = useAppSelector((state) => selectSelectedInstructionId(state));

  return (
    <li>
      <a className={shape.id === selectedModifier ? "active" : ""} onClick={() => dispatch(selectInstruction(shape.id))}>
        <DocumentIcon className="w-5 h-5" />
        Empty
      </a>
    </li>
  );
}
