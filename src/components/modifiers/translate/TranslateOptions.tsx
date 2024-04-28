import { Point } from "../../../renderer/types.ts";
import { TranslateInstruction } from "./types.ts";
import BaseOptions, { useChangeHandler } from "../BaseOptions.tsx";
import { OffsetForm } from "../../forms/OffsetForm.tsx";

export default function TranslateOptions({
  selectedInstruction,
}: {
  selectedInstruction: TranslateInstruction;
}) {
  const changeHandler = useChangeHandler(selectedInstruction);

  return (
    <BaseOptions name="Translate">
      <OffsetForm
        point={selectedInstruction.params.offset}
        onChange={(offset: Point) => changeHandler({ offset })}
      />
    </BaseOptions>
  );
}
