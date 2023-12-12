import { Blot, Group, Placement, Sprite } from "../types.ts";
import { convertBlotToSprite, convertSpriteToBlot } from "./conversion.ts";
import { blot, toPlacements } from "../builders.ts";

export function flattenToBlot(group: Group): Blot {
  const { type } = group;

  if (type === "blot") {
    return group;
  } else if (type === "sprite") {
    return convertSpriteToBlot(group);
  } else if (type === "group") {
    const { groups, anchor } = group;

    const flattenedPixels: Placement[] = [];

    for (const nestedGroup of groups) {
      const nestedBlot = flattenToBlot(nestedGroup);

      const adjustedPixels = toPlacements(nestedBlot.pixels).map(
        ({ position, pixel }) => ({
          position: {
            x: position.x + anchor.x,
            y: position.y + anchor.y,
          },
          pixel,
        }),
      );

      flattenedPixels.push(...adjustedPixels);
    }

    return blot(flattenedPixels);
  }

  function assertUnreachable(x: never): never {
    throw new Error("Unsupported type: " + x);
  }

  assertUnreachable(type);
}

export function flattenToSprite(group: Group): Sprite {
  const blot = flattenToBlot(group);

  return convertBlotToSprite(blot);
}
