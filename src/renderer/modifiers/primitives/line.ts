import { InstructionId, Placement, Point, Render, Shape } from "../../types.ts";
import place from "../place.ts";
import createRender from "../createRender.ts";
import { v4 as uuidv4 } from "uuid";
import { Color } from "../../colors.ts";

export type LineParams = {
  start: Point;
  end: Point;
  color: Color;
};

export type LineInstruction = {
  id: InstructionId;
  parentId?: InstructionId;
  category: "primitive";
  modifier: "line";
  params: LineParams;
  children: [];
};

export default class Line implements Shape {
  constructor(
    public params: LineParams,
    public id: InstructionId = uuidv4(),
  ) {}

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

    return createRender(pixels);
  }

  toInstruction(): LineInstruction {
    return {
      id: this.id,
      category: "primitive",
      modifier: "line",
      params: this.params,
      children: [],
    };
  }
}
