import { DocumentIcon } from "@heroicons/react/24/solid";
import Empty from "../../../../renderer/modifiers/primitives/empty.ts";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { selectInstruction } from "../../../../redux/slice.ts";

export default function EmptyMenuItem({ shape }: { shape: Empty }) {
  const dispatch = useAppDispatch();

  return (
    <li>
      <a onClick={() => dispatch(selectInstruction(shape.id))}>
        <DocumentIcon className="w-5 h-5" />
        Empty
      </a>
    </li>
  );
}
