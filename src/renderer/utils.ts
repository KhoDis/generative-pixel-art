import { Blot, Optional, Pixel, Placement, Point, Sprite } from "./types.ts";

export function convertBlotToSprite(blot: Blot): Sprite {
  const { pixels, anchor } = blot;

  // Find minimum x and y values in the blot
  let minX = Infinity;
  let minY = Infinity;

  for (const placement of pixels) {
    const { position } = placement;
    minX = Math.min(minX, position.x);
    minY = Math.min(minY, position.y);
  }

  // Calculate the adjusted anchor for the sprite
  const spriteAnchor: Point = {
    x: minX - anchor.x,
    y: minY - anchor.y,
  };

  // Create the sprite matrix
  const spriteMatrix: Optional<Pixel>[][] = [];

  for (const placement of pixels) {
    const { position, pixel } = placement;
    const x = position.x - minX;
    const y = position.y - minY;

    // Ensure the matrix has enough rows
    while (spriteMatrix.length <= y) {
      spriteMatrix.push([]);
    }

    // Ensure the matrix has enough columns in the current row
    while (spriteMatrix[y].length <= x) {
      spriteMatrix[y].push(null);
    }

    spriteMatrix[y][x] = pixel;
  }

  return {
    type: "sprite",
    matrix: spriteMatrix,
    anchor: spriteAnchor,
  };
}

export function convertSpriteToBlot(sprite: Sprite): Blot {
  const { matrix, anchor } = sprite;

  // Collect non-null pixels along with their positions
  const pixels: Placement[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const pixel = matrix[y][x];
      if (pixel !== null) {
        pixels.push({
          position: { x, y },
          pixel,
        });
      }
    }
  }

  return {
    type: "blot",
    pixels,
    anchor,
  };
}
