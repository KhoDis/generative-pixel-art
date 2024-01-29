import { PixelMap } from "../core/PixelMap.ts";
import { Placement, Point, Shape } from "../types.ts";
import { point } from "../factories";

// export type Figure = Group | Shape;
//
// /**
//  * Represents a group of figures.
//  * @property type - The type of the figure ("group").
//  * @property groups - The figures in the group.
//  * @property anchor - The anchor point of the group.
//  */
// export type Group = {
//   type: "group";
//   figures: Figure[];
//   anchor: Point;
// };
//
// /**
//  * Represents a shape.
//  * @property type - The type of the figure ("shape").
//  * @property pixels - The pixels that make up the shape.
//  * @see PixelMap
//  */
// export type Shape = {
//   type: "shape";
//   pixels: PixelMap;
// };

// export abstract class Figure {
//   abstract readonly type: string;
// }

export class GroupClass<T> {
  readonly returns = "group";
  figures: FigureClass<T>[];
  anchor: Point;

  constructor(figures: FigureClass<T>[], anchor: Point) {
    this.figures = figures;
    this.anchor = anchor;
  }

  toJSON() {
    return {
      type: "group",
      figures: this.figures,
      anchor: this.anchor,
    };
  }
}

export abstract class ShapeClass<T> {
  readonly returns = "shape";

  abstract toJSON(): T;

  abstract render(): Shape;
}

export type FigureClass<T> = GroupClass<T> | ShapeClass<T>;
