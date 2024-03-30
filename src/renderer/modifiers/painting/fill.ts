import {
  Color,
  InstructionId,
  Placement,
  Point,
  Render,
  Shape,
} from "../../types.ts";
import {
  getDiagonalNeighbors,
  getStraightNeighbors,
} from "../../utils/getNeighbors.ts";
import { Painting } from "./index.ts";
import render from "../render.ts";

export type TraversalMode = "straightOnly" | "includeDiagonals";

export type FillParams = {
  start: Point;
  color: Color;
  mode: TraversalMode;
};

export type FillInstruction = {
  id: InstructionId;
  type: {
    category: "painting";
    modifier: "fill";
  };
  params: FillParams;
  children: [InstructionId];
};

export default class Fill extends Painting {
  params: FillParams;

  constructor(shape: Shape, params: FillParams, id?: InstructionId) {
    super(shape, id);
    this.params = params;
  }

  render(): Render {
    const { start, color, mode } = this.params;
    const oldPixels = this.shape.render().pixels;
    const filledPixels: Placement[] = [];

    const queue: Point[] = [start];
    const visited: { [key: string]: boolean } = {};

    while (queue.length > 0) {
      const point = queue.shift()!;
      const key = `${point.x}:${point.y}`;

      if (visited[key]) continue;
      visited[key] = true;

      const pixel = oldPixels.get(point);
      if (!pixel) {
        filledPixels.push({ position: point, pixel: color });

        // Add vertical and horizontal neighbors to queue
        for (const neighbor of getStraightNeighbors(point)) {
          if (oldPixels.inBounds(neighbor)) {
            queue.push(neighbor);
          }
        }

        // Add diagonal neighbors to queue
        if (mode === "includeDiagonals") {
          for (const neighbor of getDiagonalNeighbors(point)) {
            if (oldPixels.inBounds(neighbor)) {
              queue.push(neighbor);
            }
          }
        }
      }
    }

    return render([...filledPixels, ...oldPixels]);
  }

  toInstruction(): FillInstruction {
    return {
      id: this.id,
      type: {
        category: "painting",
        modifier: "fill",
      },
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
