import { Button } from "react-daisyui";
import {
  BeakerIcon,
  CogIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  RectangleGroupIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";

export function Modifiers() {
  return (
    <div className="p-4 border-t border-base-300">
      <div className="flex items-center justify-center space-x-4">
        <Button shape="square">
          <RectangleGroupIcon className="w-6 h-6" />
        </Button>
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
