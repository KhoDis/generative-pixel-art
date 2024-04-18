import { Placement, Render } from "../../../../renderer/types.ts";
import createRender from "../../../../renderer/modifiers/createRender.ts";

export default function renderCombine(renders: Render[]): Render {
  const pixels: Placement[] = [];
  for (const render of renders) {
    pixels.push(...render.pixels);
  }
  return createRender(pixels);
}
