import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectSelectedInstruction,
  updateParams,
} from "../../../redux/slice.ts";

import { Color } from "../../../renderer/colors.ts";
import IntInput from "../../inputs/IntInput.tsx";
import ColorPickerForm from "../../forms/ColorPickerForm.tsx";

export default function CircleOptions() {
  const dispatch = useAppDispatch();
  const selectedInstruction = useAppSelector((state) =>
    selectSelectedInstruction(state),
  );
  if (!selectedInstruction) {
    return null;
  }
  if (selectedInstruction.modifier !== "circle") {
    return <div className="text-2xl">This instruction is not a circle</div>;
  }

  const handleColorChange = (color: Color) => {
    dispatch(
      updateParams({
        id: selectedInstruction.id,
        params: { color },
      }),
    );
  };

  const handleRadiusChange = (radius: number) => {
    dispatch(
      updateParams({
        id: selectedInstruction.id,
        params: { radius },
      }),
    );
  };

  return (
    <>
      <div className="text-2xl">Circle Options</div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <ColorPickerForm
          color={selectedInstruction.params.color}
          onChange={handleColorChange}
        />
        <div className="flex items-center justify-start col-span-1">Radius</div>
        <div className="flex items-center justify-center col-span-2">
          <IntInput
            defaultValue={selectedInstruction.params.radius}
            onChange={handleRadiusChange}
            min={0}
            max={50}
          />
        </div>
      </div>
    </>
  );
}
