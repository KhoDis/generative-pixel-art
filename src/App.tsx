import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer.tsx";
import { Group } from "./renderer/types.ts";
import { group } from "./renderer/builders.ts";
import blots from "./renderer/blots.ts";
import sprites from "./renderer/sprites.ts";
import colors from "./renderer/colors.ts";

const scene: Group = group([
  group([blots.rect(10, 10, colors.red), blots.rect(5, 5, colors.green)], {
    x: 0,
    y: 0,
  }),
  group([blots.rect(5, 5, colors.blue), blots.circle(5, colors.red)], {
    x: 10,
    y: 10,
  }),
  group(
    [
      blots.line({ x: 0, y: 0 }, { x: 20, y: 20 }, colors.red),
      blots.line({ x: 10, y: 0 }, { x: 0, y: 10 }, colors.green),
      group([blots.line({ x: 0, y: 0 }, { x: 10, y: 5 }, colors.blue)], {
        x: 0,
        y: -10,
      }),
    ],
    { x: 20, y: 20 },
  ),
  group([sprites.rect(10, 10, colors.yellow)], { x: 30, y: 30 }),
  group([sprites.circle(10, colors.purple)], { x: 40, y: 40 }),
  group([sprites.rect(10, 10, colors.red)], { x: 50, y: 50 }),
  group([sprites.circle(10, colors.red)], { x: 60, y: 60 }),
  group([sprites.rect(10, 10, colors.green)], { x: 70, y: 70 }),
  group([sprites.circle(10, colors.green)], { x: 80, y: 80 }),
]);

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
