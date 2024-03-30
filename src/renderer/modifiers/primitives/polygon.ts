import { Color, InstructionId, Placement, Point, Render } from "../../types.ts";
import render from "../render.ts";
import { Primitive } from "./index.ts";
import Line from "./line.ts";

export type PolygonParams = {
  points: Point[];
  color: Color;
  enclose: boolean;
};

export type PolygonInstruction = {
  id: InstructionId;
  type: {
    category: "primitive";
    modifier: "polygon";
  };
  params: PolygonParams;
  children: [];
};

export default class Polygon extends Primitive {
  params: PolygonParams;

  constructor(
    { points, color, enclose = false }: PolygonParams,
    id?: InstructionId,
  ) {
    super(id);
    this.params = { points, color, enclose };
  }

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
      type: {
        category: "primitive",
        modifier: "polygon",
      },
      params: this.params,
      children: [],
    };
  }
}
