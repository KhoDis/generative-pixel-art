import { Circle, Pixel } from "../renderer/modifiers/primitives";
import colors from "../renderer/palettes/html.ts";
import { point } from "../renderer/modifiers";
import { Shape } from "../renderer/types.ts";
import { Combine } from "../renderer/modifiers/builders";
import KonvaRenderer from "./KonvaRenderer.tsx";

export function Canvas() {
  const rect = new Circle(5, colors.red);
  // const moved = translate(
  //   reset(
  //     rect, // child
  //     point(1, 1),
  //   ),
  //   point(10, 10), // params
  // );
  const px = new Pixel(
    colors.blue, // params
    point(9, 9),
  );
  const scene: Shape = new Combine(
    // moved,
    rect,
    px,
    // translate(px, point(1, 0)), // children
  );

  return (
    <KonvaRenderer
      canvasWidth={50}
      canvasHeight={30}
      render={scene.render()}
      scale={15}
    />
    // <>
    //   <div>Canvas</div>
    // </>
  );
}
