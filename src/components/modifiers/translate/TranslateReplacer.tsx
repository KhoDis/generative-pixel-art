import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import createTranslate from "./createTranslate.ts";
import BaseReplacer from "../BaseReplacer.tsx";

export function TranslateReplacer() {
  return (
    <BaseReplacer
      name="translate"
      icon={<AdjustmentsHorizontalIcon className="w-6 h-6" />}
      getInstruction={() => createTranslate()}
    />
  );
}
