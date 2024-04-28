import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectSelectedInstruction,
  updateParams,
} from "../../../redux/slice.ts";
import IntInput from "../../inputs/IntInput.tsx";
import { Point } from "../../../renderer/types.ts";

export default function TranslateOptions() {
  const dispatch = useAppDispatch();
  const selectedInstruction = useAppSelector((state) =>
    selectSelectedInstruction(state),
  );

  if (!selectedInstruction) {
    return null;
  }
  if (selectedInstruction.modifier !== "translate") {
    return <div className="text-2xl">This instruction is not a circle</div>;
  }

  const handleOffsetChange = (offset: Point) => {
    dispatch(
      updateParams({
        id: selectedInstruction.id,
        params: { offset },
      }),
    );
  };

  return (
    <>
      <div className="text-2xl">Circle Options</div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex items-center justify-start col-span-1">Offset</div>
        <div className="flex items-center justify-center col-span-2 space-x-4">
          <IntInput
            defaultValue={selectedInstruction.params.offset.x}
            onChange={(x) =>
              handleOffsetChange({ x, y: selectedInstruction.params.offset.y })
            }
            min={-50}
            max={50}
          />
          <IntInput
            defaultValue={selectedInstruction.params.offset.y}
            onChange={(y) =>
              handleOffsetChange({ x: selectedInstruction.params.offset.x, y })
            }
            min={-50}
            max={50}
          />
        </div>
      </div>
    </>
  );
}
