import { Blot, Optional, Pixel, Placement, Sprite } from "../types.ts";
import { blot, place, sprite } from "../builders.ts";

export function convertBlotToSprite(blot: Blot): Sprite {
  const { pixels } = blot;

  if (pixels.size === 0) {
    return sprite([]);
  }

  // Calculate the size of the sprite matrix
  const spriteWidth = pixels.maxX - pixels.minX + 1;
  const spriteHeight = pixels.maxY - pixels.minY + 1;

  // Create the sprite matrix and fill it with nulls using Array.fill
  const spriteMatrix: Optional<Pixel>[][] = Array.from(
    { length: spriteHeight },
    () => Array.from({ length: spriteWidth })
  );

  for (const { position, pixel } of pixels) {
    const { x, y } = position;
    const newX = x - pixels.minX;
    const newY = y - pixels.minY;

    spriteMatrix[newY][newX] = pixel;
  }

  return sprite(spriteMatrix, { x: pixels.minX, y: pixels.minY });
}

export function convertSpriteToBlot(sprite: Sprite): Blot {
  const { matrix, anchor } = sprite;

  // Collect non-null pixels along with their positions
  const pixels: Placement[] = [];

  for (let y = 0; y < matrix.height; y++) {
    for (let x = 0; x < matrix.width; x++) {
      const pixel = matrix.get({ x, y });
      if (pixel !== null) {
        pixels.push(place(x + anchor.x, y + anchor.y, pixel));
      }
    }
  }

  return blot(pixels);
}
