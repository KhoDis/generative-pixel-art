import { Placement, Render } from "../../../renderer/types.ts";
import { createRender, place } from "../../../renderer/modifiers";
import { TranslateParams } from "./types.ts";

export default function renderTranslate(
  params: TranslateParams,
  render: Render,
): Render {
  const pixels: Placement[] = [];
  const { offset } = params;

  for (const { position, pixel } of render.pixels) {
    const newX = position.x + offset.x;
    const newY = position.y + offset.y;
    pixels.push(place(pixel, newX, newY));
  }

  return createRender(pixels);
}
