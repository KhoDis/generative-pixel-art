import { PixelMap } from "./core/PixelMap.ts";

/**
 * Represents a point in a 2D space.
 * @property x - The x coordinate.
 * @property y - The y coordinate.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Represents a color using RGBA.
 * @property r - The red component (0-255).
 * @property g - The green component (0-255).
 * @property b - The blue component (0-255).
 * @property a - The alpha component (0-255).
 */
export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

/**
 * Represents a figure which can be either a Group or a Shape.
 */
export type Figure = Group | Shape;

/**
 * Represents a group of figures.
 * @property type - The type of the figure ("group").
 * @property groups - The figures in the group.
 * @property anchor - The anchor point of the group.
 */
export type Group = {
  type: "group";
  figures: Figure[];
  anchor: Point;
};

/**
 * Represents a shape.
 * @property type - The type of the figure ("shape").
 * @property pixels - The pixels that make up the shape.
 * @see PixelMap
 */
export type Shape = {
  type: "shape";
  pixels: PixelMap;
};

/**
 * Represents a placement of a pixel at a certain position.
 * @property position - The position of the pixel.
 * @property pixel - The pixel to be placed.
 */
export type Placement = {
  position: Point;
  pixel: Pixel;
};

/**
 * Represents a pixel which is essentially a color.
 */
export type Pixel = Color;

export type Pivot =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right"
  | Point;

/**
 * Represents a list of palettes.
 */
export type Palette<T extends Record<string, string>> = {
  [K in keyof T]: { r: number; g: number; b: number };
};
