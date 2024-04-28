import { CircleReplacer } from "./circle/CircleReplacer.tsx";
import { EmptyReplacer } from "./empty/EmptyReplacer.tsx";
import { CombineReplacer } from "./combine/CombineReplacer.tsx";

export default function Modifiers() {
  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex items-center justify-center space-x-4">
        <CircleReplacer />
        <EmptyReplacer />
        <CombineReplacer />
      </div>
    </div>
  );
}
