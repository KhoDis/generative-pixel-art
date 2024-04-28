import { ReactNode } from "react";
import { Instruction } from "../../renderer/types.ts";
import { useDispatch } from "react-redux";
import { updateParams } from "../../redux/slice.ts";

export function useChangeHandler<T extends Instruction>(
  selectedInstruction: T,
) {
  const dispatch = useDispatch();

  return (params: Partial<T["params"]>) => {
    dispatch(
      updateParams({
        id: selectedInstruction.id,
        params: { ...selectedInstruction.params, ...params },
      }),
    );
  };
}

export default function BaseOptions({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="text-2xl">{name} Options</div>
      <div className="grid grid-cols-3 gap-4 p-4">{children}</div>
    </>
  );
}
