import { CircleReplacer } from "./modifiers/circle/CircleReplacer.tsx";
import { EmptyReplacer } from "./modifiers/empty/EmptyReplacer.tsx";
import { CombineReplacer } from "./modifiers/combine/CombineReplacer.tsx";

export function Modifiers() {
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
