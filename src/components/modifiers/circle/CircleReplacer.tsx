import { PlusCircleIcon } from "@heroicons/react/24/outline";
import createCircle from "./createCircle.ts";
import BaseReplacer from "../BaseReplacer.tsx";

export function CircleReplacer() {
  return (
    <BaseReplacer
      name="circle"
      icon={<PlusCircleIcon className="w-6 h-6" />}
      getInstruction={() => createCircle()}
    />
  );
}
