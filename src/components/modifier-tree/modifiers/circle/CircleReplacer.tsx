import { Button, Tooltip } from "react-daisyui";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Shape } from "../../../../renderer/types.ts";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { replaceSelectedInstruction } from "../../../../redux/slice.ts";

export function CircleReplacer({ shape }: { shape: Shape }) {
  const dispatch = useAppDispatch();

  const instruction = shape.toInstruction();

  return (
    <Tooltip message={`Replace with ${instruction.modifier}`}>
      <Button
        shape="square"
        onClick={() => dispatch(replaceSelectedInstruction({ instruction }))}
      >
        <PlusCircleIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
