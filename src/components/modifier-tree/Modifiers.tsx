import { CircleReplacer } from "./modifiers/circle/CircleReplacer.tsx";
import { EmptyReplacer } from "./modifiers/empty/EmptyReplacer.tsx";
import createCircle from "./modifiers/circle/createCircle.ts";
import createEmpty from "./modifiers/empty/createEmpty.ts";

export function Modifiers() {
  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex items-center justify-center space-x-4">
        <CircleReplacer instruction={createCircle()} />
        <EmptyReplacer instruction={createEmpty()} />
        {/*<Button shape="square">*/}
        {/*  <Square2StackIcon className="w-6 h-6" />*/}
        {/*</Button>*/}
        {/*<Button shape="square">*/}
        {/*  <CubeTransparentIcon className="w-6 h-6" />*/}
        {/*</Button>*/}
        {/*<Button shape="square">*/}
        {/*  <BeakerIcon className="w-6 h-6" />*/}
        {/*</Button>*/}
        {/*<Button shape="square">*/}
        {/*  <CogIcon className="w-6 h-6" />*/}
        {/*</Button>*/}
        {/*<Button shape="square">*/}
        {/*  <PaintBrushIcon className="w-6 h-6" />*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
