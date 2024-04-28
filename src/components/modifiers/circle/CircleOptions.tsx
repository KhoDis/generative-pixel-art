import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import {
  selectSelectedInstruction,
  updateParams,
} from "../../../redux/slice.ts";
import { CircleInstruction } from "./types.ts";

import { Color, fromHex, toHex } from "../../../renderer/colors.ts";
import { useEffect, useState } from "react";

function IntInput({
  defaultValue,
  onChange,
  min,
  max,
}: {
  defaultValue: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const [actualValue, setActualValue] = useState<string>(
    defaultValue.toString(),
  );

  useEffect(() => {
    setActualValue(defaultValue.toString());
  }, [defaultValue]);

  const toNumber = (value: string): number | null => {
    const number = Math.round(Number(value));
    if (isNaN(number)) {
      return null;
    }
    if (min !== undefined && number < min) {
      return null;
    }
    if (max !== undefined && number > max) {
      return null;
    }
    return number;
  };

  return (
    <input
      type="text"
      className={`input input-bordered input-sm w-full ${
        toNumber(actualValue) === null ? "input-error" : ""
      }`}
      value={actualValue}
      onChange={(e) => {
        const number = toNumber(e.target.value);
        if (number !== null) {
          onChange(number);
          setActualValue(number.toString());
        } else {
          setActualValue(e.target.value);
        }
      }}
      onBlur={() => {
        const number = toNumber(actualValue);
        if (number === null) {
          setActualValue(defaultValue.toString());
        }
      }}
    />
  );
}

function ColorPicker({
  color,
  onChange,
}: {
  color: Color;
  onChange: (color: Color) => void;
}) {
  return (
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
  );
}

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
    const instruction = selectedInstruction as CircleInstruction;
    dispatch(
      updateParams({
        id: instruction.id,
        params: { ...instruction.params, color },
      }),
    );
  };

  const handleRadiusChange = (radius: number) => {
    const instruction = selectedInstruction as CircleInstruction;
    dispatch(
      updateParams({
        id: instruction.id,
        params: { ...instruction.params, radius },
      }),
    );
  };

  return (
    <>
      <div className="text-2xl">Circle Options</div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex items-center justify-start col-span-1">Color</div>
        <ColorPicker
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
