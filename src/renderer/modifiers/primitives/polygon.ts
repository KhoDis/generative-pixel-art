import { Color, Placement, Point, Render } from "../../types.ts";
import shape from "../../factories/shape.ts";
import { Primitive } from "./index.ts";
import Line from "./line.ts";

export type PolygonParams = {
  points: Point[];
  color: Color;
  enclose: boolean;
};

export type PolygonInstruction = {
  type: {
    category: "primitive";
    modifier: "polygon";
  };
  params: PolygonParams;
  children: [];
};

export default class Polygon implements Primitive {
  params: PolygonParams;

  constructor(points: Point[], color: Color, enclose: boolean = false) {
    this.params = { points, color, enclose };
  }

  render(): Render {
    const { points, color, enclose } = this.params;
    const placements: Placement[][] = [];

    for (let i = 0; i < points.length - 1; i++) {
      placements.push(
        new Line(points[i], points[i + 1], color)
          .render()
          .pixels.toPlacements(),
      );
    }

    if (enclose) {
      placements.push(
        new Line(points[points.length - 1], points[0], color)
          .render()
          .pixels.toPlacements(),
      );
    }

    return shape(placements.flat());
  }

  toInstruction(): PolygonInstruction {
    return {
      type: {
        category: "primitive",
        modifier: "polygon",
      },
      params: this.params,
      children: [],
    };
  }
}
