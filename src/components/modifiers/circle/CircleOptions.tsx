import { Color } from "../../../renderer/colors.ts";
import ColorPickerForm from "../../forms/ColorPickerForm.tsx";
import { CircleInstruction } from "./types.ts";
import BaseOptions, { useChangeHandler } from "../BaseOptions.tsx";
import { SingleIntForm } from "../../forms/SingleIntForm.tsx";

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
        name="Radius"
        value={selectedInstruction.params.radius}
        onChange={(radius: number) => handleChange({ radius })}
      />
    </BaseOptions>
  );
}
