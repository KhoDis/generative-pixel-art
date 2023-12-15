import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer.tsx";
import { Figure } from "./renderer/types.ts";
import builders, { group, move, place } from "./renderer/builders.ts";
import shapes from "./renderer/shapes.ts";
import colors from "./renderer/colors.ts";
import { flatten } from "./renderer/transformers/flatten.ts";

const star = builders.shape(
  place(colors.black, 0, 0),
  place(colors.red, 1, 0),
  place(colors.red, 2, 0),
  place(colors.red, -1, 0),
  place(colors.red, -2, 0),
  place(colors.red, 0, 1),
  place(colors.red, 0, 2),
  place(colors.red, 0, -1),
  place(colors.red, 0, -2),
  place(colors.red, 1, 1),
  place(colors.red, 1, -1),
  place(colors.red, -1, 1),
  place(colors.red, -1, -1),
);

const circle = shapes.circle(5, colors.black);

const grouped = group([
  move(star, 0, 0),
  move(star, 10, 0),
  move(star, 20, 0),
  move(star, 30, 0),
  move(star, 40, 0),
  move(star, 50, 0),
]);

const flattened = flatten(grouped);

const scene: Figure = group([
  move(flattened, 0, 0),
  move(flattened, 0, 10),
  move(flattened, 0, 20),
  move(flattened, 0, 30),
  move(flattened, 0, 40),
  move(circle, 0, 50),
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
