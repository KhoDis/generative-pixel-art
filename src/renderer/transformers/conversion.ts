import { Blot, Optional, Pixel, Placement, Sprite } from "../types.ts";
import { blot, place, sprite } from "../builders.ts";

export function convertBlotToSprite(blot: Blot): Sprite {
  const { pixels } = blot;

  if (pixels.size === 0) {
    return sprite([]);
  }

  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  for (const placement of pixels) {
    const { x, y } = placement.position;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  // Calculate the size of the sprite matrix
  const spriteWidth = maxX - minX + 1;
  const spriteHeight = maxY - minY + 1;

  // Create the sprite matrix and fill it with nulls using Array.fill
  const spriteMatrix: Optional<Pixel>[][] = Array(spriteHeight)
    .fill(null)
    .map(() => Array(spriteWidth).fill(null));

  for (const { position, pixel } of pixels) {
    const { x, y } = position;
    const newX = x - minX;
    const newY = y - minY;

    spriteMatrix[newY][newX] = pixel;
  }

  return sprite(spriteMatrix, { x: minX, y: minY });
}

export function convertSpriteToBlot(sprite: Sprite): Blot {
  const { matrix, anchor } = sprite;

  // Collect non-null pixels along with their positions
  const pixels: Placement[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const pixel = matrix[y][x];
      if (pixel !== null) {
        pixels.push(place(x + anchor.x, y + anchor.y, pixel));
      }
    }
  }

  return blot(pixels);
}
