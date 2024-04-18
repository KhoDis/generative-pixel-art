import { Shape } from "../../../../renderer/types.ts";
import { useAppDispatch } from "../../../../redux/hooks.ts";
import { Button, Tooltip } from "react-daisyui";
import { replaceSelectedInstruction } from "../../../../redux/slice.ts";
import { DocumentIcon } from "@heroicons/react/24/solid";

export function EmptyReplacer({ shape }: { shape: Shape }) {
  const dispatch = useAppDispatch();

  const instruction = shape.toInstruction();

  return (
    <Tooltip message={`Replace with ${instruction.modifier}`}>
      <Button
        shape="square"
        onClick={() => dispatch(replaceSelectedInstruction({ instruction }))}
      >
        <DocumentIcon className="w-6 h-6" />
      </Button>
    </Tooltip>
  );
}
