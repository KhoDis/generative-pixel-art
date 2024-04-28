import { isPoint, Pivot, Point } from "../../renderer/types.ts";
import { useState } from "react";
import SelectForm from "./SelectForm.tsx";
import { PointForm } from "./PointForm.tsx";
import PivotFormOptions from "../modifiers/circle/CircleOptions.tsx";

type PivotFormOptions =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "custom";

export default function PivotForm({
  pivot,
  onChange,
}: {
  pivot: Pivot;
  onChange: (pivot: Pivot) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<PivotFormOptions>(
    isPoint(pivot) ? "custom" : pivot,
  );

  return (
    <>
      <SelectForm
        name="Pivot"
        value={selectedOption}
        options={[
          "center",
          "top",
          "bottom",
          "left",
          "right",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
          "custom",
        ]}
        onChange={(value) => {
          if (value === "custom") {
            onChange({ x: 0, y: 0 });
          } else {
            onChange(value);
          }
          setSelectedOption(value);
        }}
      />
      {selectedOption === "custom" && (
        <PointForm
          name="Custom Pivot"
          point={pivot as Point}
          onChange={onChange}
        />
      )}
    </>
  );
}
