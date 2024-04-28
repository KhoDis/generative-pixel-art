import { DocumentIcon } from "@heroicons/react/24/solid";
import createEmpty from "./createEmpty.ts";
import BaseReplacer from "../BaseReplacer.tsx";

export function EmptyReplacer() {
  return (
    <BaseReplacer
      name="empty"
      icon={<DocumentIcon className="w-6 h-6" />}
      getInstruction={() => createEmpty()}
    />
  );
}
