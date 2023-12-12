import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer.tsx";
import { Group } from "./renderer/types.ts";
import { blot, group } from "./renderer/builders.ts";
import colors from "./renderer/colors.ts";
import { convertBlotToSprite, convertSpriteToBlot } from "./renderer/utils.ts";

const test = blot([
  place(0, 0, colors.red),
]);

const converted = convertBlotToSprite(test);

const converted2 = convertSpriteToBlot(converted);

const scene: Group = group([
  group([
    test,
  ], { x: 10, y: 10 }),
  group([
    converted,
  ], { x: 10, y: 20 }),
  group([
    test,
  ], { x: 20, y: 10 }),
  group([
    converted,
  ], { x: 20, y: 20 }),
  group([
    converted,
  ], { x: 30, y: 10 }),
  group([
    test,
  ], { x: 30, y: 20 }),
  // test converted2
  group([
    converted2,
  ], { x: 10, y: 30 }),
  group([
    converted2,
  ], { x: 20, y: 30 }),
  group([
    test,
  ], { x: 30, y: 30 }),
], { x: 10, y: 10 });

function App() {
  return (
    <KonvaRenderer
      canvasWidth={100}
      canvasHeight={100}
      scene={scene}
      scale={5}
    />
  );
}

export default App;
