import { Figure, Group, Instruction, Shape } from "./types.ts";
import { circle, draw, line, pixel, polygon } from "./modifiers/primitives";
import {
  rectFromDimensions,
  rectFromPoints,
} from "./modifiers/primitives/rect.ts";
import { fill, outline } from "./modifiers/painting";
import { flatten, flip, rotate, trim } from "./modifiers/transformers";
import reset from "./modifiers/transformers/reset.ts";
import { removeTransparent } from "./modifiers/cleaning";
import { combine, move } from "./modifiers/builders";
import { GroupInstruction, ShapeInstruction } from "./instructions";

export function renderFigure(instruction: Instruction): Figure {
  if (
    instruction.type === "builder/combine" ||
    instruction.type === "builder/move"
  ) {
    return renderGroup(instruction);
  } else {
    return renderShape(instruction);
  }
}

export function renderGroup(instruction: GroupInstruction): Group {
  switch (instruction.type) {
    case "builder/combine":
      return combine(...instruction.figures.map(renderFigure));
    case "builder/move":
      return move(renderFigure(instruction.figure), instruction.offset);
  }
}

export function renderShape(instruction: ShapeInstruction): Shape {
  switch (instruction.type) {
    case "transformer/flatten":
      return flatten(renderFigure(instruction.figure));
    case "transformer/reset":
      return reset(renderShape(instruction.shape), instruction.pivot);
    case "transformer/flip":
      return flip(
        renderShape(instruction.shape),
        instruction.axis,
        instruction.anchor,
      );
    case "transformer/rotate":
      return rotate(
        renderShape(instruction.shape),
        instruction.anchor,
        instruction.mode,
      );
    case "transformer/trim":
      return trim(renderShape(instruction.shape));
    case "cleaning/removeTransparent":
      return removeTransparent(renderShape(instruction.shape));
    case "primitive/circle":
      return circle(instruction.radius, instruction.color);
    case "primitive/polygon":
      return polygon(
        instruction.points,
        instruction.color,
        instruction.enclose,
      );
    case "primitive/draw":
      return draw(...instruction.placements);
    case "primitive/rect/fromPoints":
      return rectFromPoints(
        instruction.start,
        instruction.end,
        instruction.color,
      );
    case "primitive/rect/fromDimensions":
      return rectFromDimensions(
        instruction.width,
        instruction.height,
        instruction.pivot,
        instruction.color,
      );
    case "primitive/line":
      return line(instruction.start, instruction.end, instruction.color);
    case "primitive/pixel":
      return pixel(instruction.color, instruction.point);
    case "painting/fill":
      return fill(
        renderShape(instruction.shape),
        instruction.start,
        instruction.color,
        instruction.mode,
      );
    case "painting/outline":
      return outline(
        renderShape(instruction.shape),
        instruction.color,
        instruction.mode,
      );
  }
}
