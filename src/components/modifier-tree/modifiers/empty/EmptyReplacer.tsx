import { useAppDispatch } from "../../../../redux/hooks.ts";
import { Button, Tooltip } from "react-daisyui";
import { replaceSelectedInstruction } from "../../../../redux/slice.ts";
import { DocumentIcon } from "@heroicons/react/24/solid";
import createEmpty from "./createEmpty.ts";

export function EmptyReplacer() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip message={`Replace with empty`}>
      <Button
        shape="square"
        onClick={() => dispatch(replaceSelectedInstruction({ instruction: createEmpty() }))}
      >
        <DocumentIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
