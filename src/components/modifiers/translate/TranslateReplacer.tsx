import { Button, Tooltip } from "react-daisyui";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../redux/hooks.ts";
import {
  addInstruction,
  replaceSelectedInstruction,
} from "../../../redux/slice.ts";
import createTranslate from "./createTranslate.ts";
import createEmpty from "../empty/createEmpty.ts";

export function TranslateReplacer() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip message={`Replace with translate`}>
      <Button
        shape="square"
        onClick={() => {
          const emptyInstruction = createEmpty();
          const instruction = createTranslate(
            undefined,
            { offset: { x: 0, y: 0 } },
            emptyInstruction.id,
          );
          emptyInstruction.parentId = instruction.id;
          dispatch(addInstruction(emptyInstruction));
          dispatch(replaceSelectedInstruction({ instruction }));
        }}
      >
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
