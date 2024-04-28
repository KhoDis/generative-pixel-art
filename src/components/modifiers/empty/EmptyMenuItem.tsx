import { DocumentIcon } from "@heroicons/react/24/solid";
import { InstructionId } from "../../../renderer/types.ts";
import BaseMenuItem from "../BaseMenuItem.tsx";

export default function EmptyMenuItem({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  return (
    <BaseMenuItem
      instructionId={instructionId}
      icon={<DocumentIcon className="w-5 h-5" />}
      name="Empty"
    />
  );
}
