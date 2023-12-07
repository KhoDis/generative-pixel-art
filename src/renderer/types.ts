export type Point = {
  x: number;
  y: number;
};

export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type Group =
  | {
      type: "group";
      groups: Group[];
      anchor: Point;
    }
  | {
      type: "leaf";
      pixels: Pixel[];
      anchor: Point;
    };

export type Pixel = {
  position: Point;
  color: Color;
};
