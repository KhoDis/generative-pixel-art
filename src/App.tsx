import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer.tsx";
import { Group } from "./renderer/types.ts";
import { blot, group } from "./renderer/builders.ts";
import colors from "./renderer/colors.ts";
import { convertBlotToSprite, convertSpriteToBlot } from "./renderer/utils.ts";

const test = blot([
  {
    position: { x: 0, y: 0 },
    pixel: colors.red,
  },
  {
    position: { x: 1, y: 0 },
    pixel: colors.green,
  },
  {
    position: { x: 0, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 1, y: 1 },
    pixel: colors.yellow,
  },
  {
    position: { x: -1, y: 0 },
    pixel: colors.purple,
  },
  {
    position: { x: 0, y: -1 },
    pixel: colors.cyan,
  },
  {
    position: { x: -1, y: -1 },
    pixel: colors.white,
  },
  {
    position: { x: 1, y: -1 },
    pixel: colors.black,
  },
  {
    position: { x: -4, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: -4, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: -3, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: -3, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: -2, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: -2, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: -1, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: -1, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: 0, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 0, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: 1, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 1, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: 2, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 2, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: 3, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 3, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: 4, y: 1 },
    pixel: colors.blue,
  },
  {
    position: { x: 4, y: 2 },
    pixel: colors.blue,
  },
  {
    position: { x: -4, y: -1 },
    pixel: colors.blue,
  },
  {
    position: { x: -4, y: -2 },
    pixel: colors.blue,
  },
  {
    position: { x: -3, y: -1 },
    pixel: colors.blue,
  },
  {
    position: { x: -3, y: -2 },
    pixel: colors.blue
  }
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
