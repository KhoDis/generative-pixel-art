import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { InstructionId } from "../../../renderer/types.ts";
import BaseMenuItem from "../BaseMenuItem.tsx";

export default function TranslateMenuItem({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  return (
    <BaseMenuItem
      instructionId={instructionId}
      icon={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
      name="Translate"
    />
  );
}
