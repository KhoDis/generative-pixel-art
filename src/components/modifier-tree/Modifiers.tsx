import { CircleReplacer } from "./modifiers/circle/CircleReplacer.tsx";
import { EmptyReplacer } from "./modifiers/empty/EmptyReplacer.tsx";
import createCircle from "./modifiers/circle/createCircle.ts";
import createEmpty from "./modifiers/empty/createEmpty.ts";
import { CombineReplacer } from "./modifiers/combine/CombineReplacer.tsx";

export function Modifiers() {
  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex items-center justify-center space-x-4">
        <CircleReplacer instruction={createCircle()} />
        <EmptyReplacer instruction={createEmpty()} />
        <CombineReplacer />
      </div>
    </div>
  );
}
