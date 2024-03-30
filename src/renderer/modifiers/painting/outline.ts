import { Color, InstructionId, Placement, Render, Shape } from "../../types.ts";
import {
  getDiagonalNeighbors,
  getStraightNeighbors,
} from "../../utils/getNeighbors.ts";
import { Painting } from "./index.ts";
import render from "../render.ts";

export type OutlineMode = "none" | "all" | "corners";

export type OutlineParams = {
  color: Color;
  mode: OutlineMode;
};

export type OutlineInstruction = {
  id: InstructionId;
  type: {
    category: "painting";
    modifier: "outline";
  };
  params: OutlineParams;
  children: [InstructionId];
};

export default class Outline extends Painting {
  params: OutlineParams;

  constructor(shape: Shape, params: OutlineParams, id?: InstructionId) {
    super(shape, id);
    this.params = params;
  }

  render(): Render {
    const { color, mode } = this.params;
    const pixels = this.shape.render().pixels;
    const outlinePixels: Placement[] = [];

    // Place vertical and horizontal outline pixels
    for (const { position } of pixels) {
      const straightNeighbors = getStraightNeighbors(position);
      for (const neighbor of straightNeighbors) {
        if (!pixels.has(neighbor)) {
          outlinePixels.push({ position: neighbor, pixel: color });
        }
      }
    }

    // Place diagonal outline pixels
    if (mode === "none") {
      // nothing
    } else if (mode === "all") {
      for (const { position } of pixels) {
        const diagonalNeighbors = getDiagonalNeighbors(position);
        for (const neighbor of diagonalNeighbors) {
          if (!pixels.has(neighbor)) {
            outlinePixels.push({ position: neighbor, pixel: color });
          }
        }
      }
    } else if (mode === "corners") {
      for (const { position } of pixels) {
        const diagonalNeighbors = getDiagonalNeighbors(position);
        diagonalNeighbors.forEach((neighbor, i) => {
          // Check if target pixel is a corner
          if (
            !pixels.has(diagonalNeighbors[(i - 1 + 4) % 4]) && // smoothness check
            !pixels.has(diagonalNeighbors[(i + 1) % 4]) && // smoothness check
            !pixels.has(neighbor) // target placement
          ) {
            outlinePixels.push({
              position: neighbor,
              pixel: color,
            });
          }
        });
      }
    }

    return render([...pixels, ...outlinePixels]);
  }

  toInstruction(): OutlineInstruction {
    return {
      id: this.id,
      type: {
        category: "painting",
        modifier: "outline",
      },
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
