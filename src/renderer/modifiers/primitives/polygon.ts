import {
  Color,
  InstructionId,
  Placement,
  Point,
  Render,
  Shape,
} from "../../types.ts";
import render from "../render.ts";
import Line from "./line.ts";
import { v4 as uuidv4 } from "uuid";

export type PolygonParams = {
  points: Point[];
  color: Color;
  enclose: boolean;
};

export type PolygonInstruction = {
  id: InstructionId;
  category: "primitive";
  modifier: "polygon";
  params: PolygonParams;
  children: [];
};

export default class Polygon implements Shape {
  constructor(
    public params: PolygonParams,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const { points, color, enclose } = this.params;
    const placements: Placement[][] = [];

    for (let i = 0; i < points.length - 1; i++) {
      placements.push(
        new Line({ start: points[i], end: points[i + 1], color })
          .render()
          .pixels.toPlacements(),
      );
    }

    if (enclose) {
      placements.push(
        new Line({ start: points[points.length - 1], end: points[0], color })
          .render()
          .pixels.toPlacements(),
      );
    }

    return render(placements.flat());
  }

  toInstruction(): PolygonInstruction {
    return {
      id: this.id,
      category: "primitive",
      modifier: "polygon",
      params: this.params,
      children: [],
    };
  }
}
