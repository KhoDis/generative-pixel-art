import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer.tsx";
import { Group } from "./renderer/types.ts";
import { at, blot, group, place, sprite } from "./renderer/builders.ts";
import blots from "./renderer/blots.ts";
import sprites from "./renderer/sprites.ts";
import colors from "./renderer/colors.ts";
import {
  convertBlotToSprite,
  convertSpriteToBlot,
} from "./renderer/transformers/conversion.ts";
import { flattenToBlot } from "./renderer/transformers/flattening.ts";

const star = blot([
  place(0, 0, colors.black),
  place(1, 0, colors.red),
  place(2, 0, colors.red),
  place(-1, 0, colors.red),
  place(-2, 0, colors.red),
  place(0, 1, colors.red),
  place(0, 2, colors.blue),
  place(0, -1, colors.red),
  place(0, -2, colors.red),
  place(1, 1, colors.red),
  place(1, -1, colors.red),
  place(-1, 1, colors.red),
  place(-1, -1, colors.red),
]);

const square = sprite([
  [colors.black, colors.red],
  [colors.red, colors.red],
]);

const circleBlot = blots.circle(5, colors.black);
const circleSprite = sprites.circle(5, colors.black);

const spriteStar = convertBlotToSprite(star);
const blotSquare = convertSpriteToBlot(square);

const blotStar = convertSpriteToBlot(spriteStar);
const spriteSquare = convertBlotToSprite(blotSquare);

const grouped = group([
  at(0, 0, blotStar),
  at(5, 0, spriteSquare),
  at(0, 5, blotSquare),
  at(5, 5, spriteStar),
]);

const flattenedBlot = flattenToBlot(grouped);
const flattenedSprite = convertBlotToSprite(flattenedBlot);

const scene: Group = group([
  at(0, 0, flattenedBlot),
  at(15, 15, flattenedSprite),
  at(30, 30, circleBlot),
  at(45, 45, circleSprite),
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
