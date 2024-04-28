import { Button, Tooltip } from "react-daisyui";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../redux/hooks.ts";
import {
  replaceSelectedInstruction,
} from "../../../redux/slice.ts";
import createCombine from "./createCombine.ts";
import createEmpty from "../empty/createEmpty.ts";

export function CombineReplacer() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip message={`Replace with combine`}>
      <Button
        shape="square"
        onClick={() => {
          const instruction = createCombine(undefined, [
            createEmpty().id,
            createEmpty().id,
          ]);
          dispatch(replaceSelectedInstruction({ instruction }));
        }}
      >
        <Square2StackIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
