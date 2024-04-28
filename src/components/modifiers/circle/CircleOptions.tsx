import { Color } from "../../../renderer/colors.ts";
import ColorPickerForm from "../../forms/ColorPickerForm.tsx";
import { CircleInstruction } from "./types.ts";
import BaseOptions, { useChangeHandler } from "../BaseOptions.tsx";
import { SingleIntForm } from "../../forms/SingleIntForm.tsx";
import { Pivot } from "../../../renderer/types.ts";
import PivotForm from "../../forms/PivotForm.tsx";

export default function CircleOptions({
  selectedInstruction,
}: {
  selectedInstruction: CircleInstruction;
}) {
  const handleChange = useChangeHandler(selectedInstruction);

  return (
    <BaseOptions name="Circle">
      <ColorPickerForm
        color={selectedInstruction.params.color}
        onChange={(color: Color) => handleChange({ color })}
      />
      <SingleIntForm
        name="Diameter"
        value={selectedInstruction.params.diameter}
        onChange={(diameter: number) => handleChange({ diameter })}
      />
      <PivotForm
        pivot={selectedInstruction.params.pivot}
        onChange={(pivot: Pivot) => handleChange({ pivot })}
      />
    </BaseOptions>
  );
}
