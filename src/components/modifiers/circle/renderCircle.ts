import { Point, Render } from "../../../renderer/types.ts";
import { createRender, place } from "../../../renderer/modifiers";
import { CircleParams } from "./types.ts";

export default function renderCircle(params: CircleParams): Render {
  const pixels = [];
  const { pivot, diameter, color } = params;

  let pivotPoint: Point;
  if (pivot === "center") {
    pivotPoint = { x: diameter / 2, y: diameter / 2 };
  } else if (pivot === "top-left") {
    pivotPoint = { x: 0, y: 0 };
  } else if (pivot === "top-right") {
    pivotPoint = { x: diameter, y: 0 };
  } else if (pivot === "bottom-left") {
    pivotPoint = { x: 0, y: diameter };
  } else if (pivot === "bottom-right") {
    pivotPoint = { x: diameter, y: diameter };
  } else if (pivot === "top") {
    pivotPoint = { x: diameter / 2, y: 0 };
  } else if (pivot === "bottom") {
    pivotPoint = { x: diameter / 2, y: diameter };
  } else if (pivot === "left") {
    pivotPoint = { x: 0, y: diameter / 2 };
  } else if (pivot === "right") {
    pivotPoint = { x: diameter, y: diameter / 2 };
  } else {
    pivotPoint = pivot;
  }

  const radius = diameter / 2;
  for (let x = -radius; x < radius; x++) {
    for (let y = -radius; y < radius; y++) {
      if (x * x + y * y < radius * radius) {
        pixels.push(place(color, x + pivotPoint.x, y + pivotPoint.y));
      }
    }
  }

  return createRender(pixels);
}
