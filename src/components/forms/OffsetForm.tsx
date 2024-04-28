import { Point } from "../../renderer/types.ts";
import IntInput from "../inputs/IntInput.tsx";

export function OffsetForm({
  name = "Offset",
  point,
  onChange,
}: {
  name?: string;
  point: Point;
  onChange: (point: Point) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-start col-span-1">{name}</div>
      <div className="flex items-center justify-center col-span-2 space-x-4">
        <span>x:</span>
        <IntInput
          defaultValue={point.x}
          onChange={(x) => onChange({ x, y: point.y })}
          min={-50}
          max={50}
        />
        <span>y:</span>
        <IntInput
          defaultValue={point.y}
          onChange={(y) => onChange({ x: point.x, y })}
          min={-50}
          max={50}
        />
      </div>
    </>
  );
}
