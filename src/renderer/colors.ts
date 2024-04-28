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

export function toHex(color: Color): string {
  const r = color.r.toString(16).padStart(2, "0");
  const g = color.g.toString(16).padStart(2, "0");
  const b = color.b.toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function fromHex(hex: string): Color {
  const hexColor = hex.replace("#", "");
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return { r, g, b };
}
