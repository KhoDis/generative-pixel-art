import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer";
import { Figure } from "./renderer/types";
import shapes from "./renderer/modifiers/shapes";
import colors from "./renderer/palettes/html.ts";
import fill from "./renderer/modifiers/painting/fill.ts";
import flatten from "./renderer/modifiers/transformers/flatten.ts";
import outline from "./renderer/modifiers/painting/outline.ts";
import move from "./renderer/modifiers/builders/move.ts";
import rotate from "./renderer/modifiers/transformers/rotate.ts";
import { combine, point } from "./renderer/factories";

const triangle = shapes.polygon(
  [point(0, 0), point(10, 0), point(0, 10)],
  colors.red,
  true,
);

const filledTriangle = fill(flatten(triangle), point(3, 3), colors.blue);

const outlinedTriangle = outline(filledTriangle, colors.black);

const rotatedTriangle = rotate(outlinedTriangle, point(5, 5), "180");

const scene: Figure = combine(move(rotatedTriangle, point(10, 10)));

function App() {
  return (
    <KonvaRenderer
      canvasWidth={50}
      canvasHeight={50}
      scene={scene}
      scale={20}
    />
  );
}

export default App;
