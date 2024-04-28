import { ReactNode } from "react";
import { Instruction } from "../../renderer/types.ts";
import { useAppDispatch } from "../../redux/hooks.ts";
import { Button, Tooltip } from "react-daisyui";
import { replaceSelectedInstruction } from "../../redux/slice.ts";

export default function BaseReplacer({
  name,
  icon,
  getInstruction,
}: {
  name: string;
  icon: ReactNode;
  getInstruction: () => Instruction;
}) {
  const dispatch = useAppDispatch();

  return (
    <Tooltip message={`Replace with ${name}`}>
      <Button
        shape="square"
        onClick={() =>
          dispatch(
            replaceSelectedInstruction({ instruction: getInstruction() }),
          )
        }
      >
        {icon}
      </Button>
    </Tooltip>
  );
}
