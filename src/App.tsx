import "./App.css";

import KonvaRenderer from "./components/KonvaRenderer";
import { Figure } from "./renderer/types";
import shapes from "./renderer/modifiers/shapes";
import colors from "./renderer/palettes/html.ts";
import { combine, point } from "./renderer/factories";
import reset from "./renderer/modifiers/builders/reset.ts";
import { translate } from "./renderer/modifiers/transformers";
import pixel from "./renderer/modifiers/shapes/pixel.ts";

const rect = shapes.rect.fromPoints(point(0, 0), point(8, 8), colors.red);
const fig = reset(rect, point(1, 1));
console.log(rect.pixels);
console.log(fig.pixels);
// move fig 10, 10
const moved = translate(fig, point(10, 10));
// draw one pixel at 9, 9
const px = pixel(colors.blue, point(9, 9));
// combine the two
const scene: Figure = combine(moved, px);

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
