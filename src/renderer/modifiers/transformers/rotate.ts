import { InstructionId, Placement, Point, Render, Shape } from "../../types.ts";
import { place, createRender } from "../index.ts";
import { v4 as uuidv4 } from "uuid";

export type RotationMode = "90cw" | "90ccw" | "180" | "none";

export type RotateParams = {
  anchor: Point;
  mode: RotationMode;
};

export type RotateInstruction = {
  id: InstructionId;
  parentId?: InstructionId;
  category: "transformer";
  modifier: "rotate";
  params: RotateParams;
  children: [InstructionId];
};

export default class Rotate implements Shape {
  constructor(
    public params: RotateParams,
    public shape: Shape,
    public id: InstructionId = uuidv4(),
  ) {}

  render(): Render {
    const placements: Placement[] = [];
    const { anchor, mode } = this.params;

    // Yes, this is a lot of code duplication, but it's the fastest way to do it.
    if (mode === "90cw") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = anchor.y + position.y - anchor.x;
        const newY = anchor.x + anchor.y - position.x;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "90ccw") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = anchor.x + anchor.y - position.y;
        const newY = anchor.y + position.x - anchor.x;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "180") {
      for (const { position, pixel } of this.shape.render().pixels) {
        const newX = 2 * anchor.x - position.x;
        const newY = 2 * anchor.y - position.y;
        placements.push(place(pixel, newX, newY));
      }
    } else if (mode === "none") {
      for (const { position, pixel } of this.shape.render().pixels) {
        placements.push(place(pixel, position.x, position.y));
      }
    }

    return createRender(placements);
  }

  toInstruction(): RotateInstruction {
    return {
      id: this.id,
      category: "transformer",
      modifier: "rotate",
      params: this.params,
      children: [this.shape.toInstruction().id],
    };
  }
}
