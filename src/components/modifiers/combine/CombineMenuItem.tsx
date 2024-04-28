import { Square2StackIcon } from "@heroicons/react/24/outline";
import { InstructionId } from "../../../renderer/types.ts";
import BaseMenuItem from "../BaseMenuItem.tsx";

export default function CombineMenuItem({
  instructionId,
}: {
  instructionId: InstructionId;
}) {
  return (
    <BaseMenuItem
      instructionId={instructionId}
      icon={<Square2StackIcon className="w-5 h-5" />}
      name="Combine"
    />
  );
}
