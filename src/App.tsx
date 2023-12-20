import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer";
import { Figure } from "./renderer/types";
import { combine, move, point } from "./renderer/builders";
import shapes from "./renderer/shapes";
import colors from "./renderer/colors";
import fill from "./renderer/algorithms/fill.ts";
import { flatten } from "./renderer/transformers/flatten.ts";
import outline from "./renderer/algorithms/outline.ts";

const triangle = shapes.polygon(
  [point(0, 0), point(10, 0), point(0, 10)],
  colors.red,
  true,
);

const filledTriangle = fill(flatten(triangle), point(3, 3), colors.blue);

const outlinedTriangle = outline(filledTriangle, colors.black, true);

const scene: Figure = combine(move(outlinedTriangle, 10, 10));

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
