import { Palette } from "../types.ts";

export default function makePalette<T extends Record<string, string>>(
  colors: T,
): Palette<T> {
  const palette: Palette<T> = {} as Palette<T>;

  for (const [name, color] of Object.entries(colors)) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    palette[name as keyof T] = { r, g, b };
  }

  return palette;
}
