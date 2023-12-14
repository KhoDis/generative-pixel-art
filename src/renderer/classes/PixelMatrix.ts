import { Optional, Pixel, Placement, Point } from "../types.ts";
import { place } from "../builders.ts";

export class PixelMatrix {
  private readonly _data: Optional<Pixel>[];
  private readonly _width: number;
  private readonly _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._data = new Array(width * height).fill(null);
  }

  private index(point: Point): number {
    return point.y * this._width + point.x;
  }

  get(point: Point): Optional<Pixel> {
    return this._data[this.index(point)] ?? null;
  }

  set(point: Point, value: Optional<Pixel>): void {
    this._data[this.index(point)] = value;
  }

  *[Symbol.iterator](): IterableIterator<Placement> {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const pixel = this.get({ x, y });
        if (pixel !== null) {
          yield place(x, y, pixel);
        }
      }
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  toJSON(): Optional<Pixel>[][] {
    const matrix: Optional<Pixel>[][] = [];
    for (let y = 0; y < this._height; y++) {
      const row: Optional<Pixel>[] = [];
      for (let x = 0; x < this._width; x++) {
        row.push(this.get({ x, y }));
      }
      matrix.push(row);
    }
    return matrix;
  }
}
