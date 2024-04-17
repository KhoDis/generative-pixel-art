import Empty from "../../../../renderer/modifiers/primitives/empty.ts";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { selectInstruction } from "../../../../redux/slice.ts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function CircleMenuItem({ shape }: { shape: Empty }) {
  const dispatch = useAppDispatch();

  return (
    <li>
      <a onClick={() => dispatch(selectInstruction(shape.id))}>
        <PlusCircleIcon className="w-5 h-5" />
        Empty
      </a>
    </li>
  );
}
