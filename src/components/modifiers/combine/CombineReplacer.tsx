import { Square2StackIcon } from "@heroicons/react/24/outline";
import createCombine from "./createCombine.ts";
import createEmpty from "../empty/createEmpty.ts";
import BaseReplacer from "../BaseReplacer.tsx";

export function CombineReplacer() {
  return (
    <BaseReplacer
      name="combine"
      icon={<Square2StackIcon className="w-6 h-6" />}
      getInstruction={() =>
        createCombine(undefined, [createEmpty().id, createEmpty().id])
      }
    />
  );
}
