import { PixelMap } from "./core/PixelMap.ts";
import { PrimitiveInstruction } from "./modifiers/primitives";
import { PaintingInstruction } from "./modifiers/painting";
import { CleaningInstruction } from "./modifiers/cleaning";
import { BuilderInstruction } from "./modifiers/builders";
import { TransformerInstruction } from "./modifiers/transformers";

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

export type Render = {
  pixels: PixelMap;
};

export type Instruction =
  | PrimitiveInstruction
  | PaintingInstruction
  | CleaningInstruction
  | BuilderInstruction
  | TransformerInstruction;

export type InstructionState = {
  id: InstructionId;
  instruction: Instruction;
};

export type InstructionId = string;

export interface Shape {
  toInstruction(): Instruction;
  render(): Render;
}

/**
 * Represents a placement of a pixel at a certain position.
 * @property position - The position of the pixel.
 * @property pixel - The pixel to be placed.
 */
export type Placement = {
  position: Point;
  pixel: Color;
};

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
