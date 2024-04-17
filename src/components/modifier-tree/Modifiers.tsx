import { Button } from "react-daisyui";
import {
  BeakerIcon,
  CogIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  RectangleGroupIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { Circle } from "../../renderer/modifiers/primitives";
import { CircleReplacer } from "./modifiers/circle/CircleReplacer.tsx";

export function Modifiers() {
  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex items-center justify-center space-x-4">
        <CircleReplacer shape={new Circle()} />
        <Button shape="square">
          <Square2StackIcon className="w-6 h-6" />
        </Button>
        <Button shape="square">
          <CubeTransparentIcon className="w-6 h-6" />
        </Button>
        <Button shape="square">
          <BeakerIcon className="w-6 h-6" />
        </Button>
        <Button shape="square">
          <CogIcon className="w-6 h-6" />
        </Button>
        <Button shape="square">
          <PaintBrushIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
