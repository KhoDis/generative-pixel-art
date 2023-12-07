import "./App.css";

import PixelArtRenderer from "./components/KonvaRenderer.tsx";
import { Color, Group } from "./renderer/types.ts";
import { group } from "./renderer/builders.ts";
import { circle, line, rect } from "./renderer/primitives.ts";

const red: Color = { r: 255, g: 0, b: 0 };
const green: Color = { r: 0, g: 255, b: 0 };
const blue: Color = { r: 0, g: 0, b: 255 };

const scene: Group = group([
  group([rect(10, 10, red), rect(5, 5, green)], { x: 0, y: 0 }),
  group([rect(5, 5, blue), circle(5, red)], { x: 10, y: 10 }),
  group(
    [
      line({ x: 0, y: 0 }, { x: 20, y: 20 }, red),
      line({ x: 10, y: 0 }, { x: 0, y: 10 }, green),
      group([line({ x: 0, y: 0 }, { x: 10, y: 5 }, blue)], { x: 0, y: -10 }),
    ],
    { x: 20, y: 20 },
  ),
]);

function App() {
  return (
    <PixelArtRenderer
      canvasWidth={100}
      canvasHeight={100}
      scene={scene}
      scale={5}
    />
  );
}

export default App;
