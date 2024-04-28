import { Placement } from "../types.ts";
import { Color } from "../colors.ts";

/**
 * Places a pixel at a specified position.
 * @param pixel - The pixel to place.
 * @param [x=0] - The x coordinate of the position.
 * @param [y=0] - The y coordinate of the position.
 * @returns The placement of the pixel.
 */
export default function place(
  pixel: Color,
  x: number = 0,
  y: number = 0,
): Placement {
  return { position: { x, y }, pixel };
}
