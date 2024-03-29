import { Color, Placement, Point, Render } from "../../types.ts";
import place from "../place.ts";
import { Primitive } from "./index.ts";
import render from "../render.ts";

export type LineParams = {
  start: Point;
  end: Point;
  color: Color;
};

export type LineInstruction = {
  type: {
    category: "primitive";
    modifier: "line";
  };
  params: LineParams;
  children: [];
};

export default class Line implements Primitive {
  params: LineParams;

  constructor(start: Point, end: Point, color: Color) {
    this.params = { start, end, color };
  }

  render(): Render {
    const { start, end, color } = this.params;
    const pixels: Placement[] = [];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const xStep = dx / steps;
    const yStep = dy / steps;

    for (let i = 0; i <= steps; i++) {
      const x = Math.round(start.x + xStep * i);
      const y = Math.round(start.y + yStep * i);
      pixels.push(place(color, x, y));
    }

    return render(pixels);
  }

  toInstruction(): LineInstruction {
    return {
      type: {
        category: "primitive",
        modifier: "line",
      },
      params: this.params,
      children: [],
    };
  }
}
