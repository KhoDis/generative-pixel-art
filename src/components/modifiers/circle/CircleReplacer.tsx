import { Button, Tooltip } from "react-daisyui";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../redux/hooks.ts";
import { replaceSelectedInstruction } from "../../../redux/slice.ts";
import createCircle from "./createCircle.ts";

export function CircleReplacer() {
  const dispatch = useAppDispatch();

  return (
    <Tooltip message={`Replace with circle`}>
      <Button
        shape="square"
        onClick={() => {
          const instruction = createCircle();
          return dispatch(replaceSelectedInstruction({ instruction }));
        }}
      >
        <PlusCircleIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
