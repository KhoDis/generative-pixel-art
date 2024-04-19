import { PixelMap } from "./core/PixelMap.ts";
import { CircleInstruction } from "../components/modifier-tree/modifiers/circle/types.ts";
import { EmptyInstruction } from "../components/modifier-tree/modifiers/empty/types.ts";
import { CombineInstruction } from "../components/modifier-tree/modifiers/combine/types.ts";

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

export type Nullary = {
  children: [];
  arity: "nullary";
};

export type Unary = {
  children: [InstructionId];
  arity: "unary";
};

export type Binary = {
  children: [InstructionId, InstructionId];
  arity: "binary";
};

export type Variadic = {
  children: InstructionId[];
  arity: "variadic";
};

export type Primitive = {
  category: "primitive";
};

export type Painting = {
  category: "painting";
};

export type Cleaning = {
  category: "cleaning";
};

export type Builder = {
  category: "builder";
};

export type Transformer = {
  category: "transformer";
};

export type NoParams = Record<string, never>;

export type MakeInstruction<
  TModifier extends string,
  TParams extends Record<string, unknown>,
  TCategory extends Primitive | Painting | Cleaning | Builder | Transformer,
  TArity extends Nullary | Unary | Binary | Variadic,
> = {
  id: InstructionId;
  parentId?: InstructionId;
  modifier: TModifier;
  params: {
    [Property in keyof TParams]: TParams[Property];
  };
} & TArity &
  TCategory;

export type Instruction =
  | CircleInstruction
  | EmptyInstruction
  | CombineInstruction;

export type InstructionId = string;

export interface Shape {
  id: InstructionId;
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
