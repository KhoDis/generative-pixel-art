import { Button, Tooltip } from "react-daisyui";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { replaceSelectedInstruction } from "../../../../redux/slice.ts";
import { CircleInstruction } from "../../../../renderer/modifiers/primitives/circle.ts";

export function CircleReplacer({
  instruction,
}: {
  instruction: CircleInstruction;
}) {
  const dispatch = useAppDispatch();

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
