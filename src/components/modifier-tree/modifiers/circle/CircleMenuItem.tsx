import Empty from "../../../../renderer/modifiers/primitives/empty.ts";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks.ts";
import { selectInstruction, selectSelectedInstructionId } from "../../../../redux/slice.ts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Circle } from "../../../../renderer/modifiers/primitives";

export default function CircleMenuItem({ shape }: { shape: Circle }) {
  const dispatch = useAppDispatch();
  const selectedModifier = useAppSelector((state) => selectSelectedInstructionId(state));

  return (
    <li>
      <a className={shape.id === selectedModifier ? "active" : ""} onClick={() => dispatch(selectInstruction(shape.id))}>
        <PlusCircleIcon className="w-5 h-5" />
        Circle
      </a>
    </li>
  );
}
