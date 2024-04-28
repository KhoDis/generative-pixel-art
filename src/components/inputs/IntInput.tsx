import { useEffect, useState } from "react";

export default function IntInput({
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
