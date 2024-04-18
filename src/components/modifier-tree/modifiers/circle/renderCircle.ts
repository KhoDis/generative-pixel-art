import { Render } from "../../../../renderer/types.ts";
import { createRender, place } from "../../../../renderer/modifiers";
import { CircleParams } from "../../../../renderer/modifiers/primitives/circle.ts";

export default function renderCircle(params: CircleParams): Render {
  const pixels = [];
  const { radius, color } = params;

  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(place(color, x + radius, y + radius));
      }
    }
  }

  return createRender(pixels);
}
