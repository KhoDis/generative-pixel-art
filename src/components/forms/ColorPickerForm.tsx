import { Color, fromHex, toHex } from "../../renderer/colors.ts";
import IntInput from "../inputs/IntInput.tsx";

export default function ColorPickerForm({
  name = "Color",
  color,
  onChange,
}: {
  name?: string;
  color: Color;
  onChange: (color: Color) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-start col-span-1">{name}</div>
      <div className="grid grid-cols-4 gap-4 col-span-2">
        <input
          type="color"
          className="input input-bordered input-sm w-full"
          value={toHex(color)}
          onChange={(e) => onChange(fromHex(e.target.value))}
        />
        <IntInput
          defaultValue={color.r}
          onChange={(value) => onChange({ ...color, r: value })}
          min={0}
          max={255}
        />
        <IntInput
          defaultValue={color.g}
          onChange={(value) => onChange({ ...color, g: value })}
          min={0}
          max={255}
        />
        <IntInput
          defaultValue={color.b}
          onChange={(value) => onChange({ ...color, b: value })}
          min={0}
          max={255}
        />
      </div>
    </>
  );
}
