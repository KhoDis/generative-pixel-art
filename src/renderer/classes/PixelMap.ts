import { Pixel, Placement, Point } from "../types.ts";

export class PixelMap {
  private readonly _map: Map<string, Pixel>;
  public minX: number;
  public minY: number;
  public maxX: number;
  public maxY: number;

  constructor() {
    this._map = new Map();
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
  }

  get size(): number {
    return this._map.size;
  }

  set(point: Point, pixel: Pixel) {
    const { x, y } = point;
    this._map.set(`${x}:${y}`, pixel);

    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);
  }

  get(point: Point): Pixel | undefined {
    const { x, y } = point;
    return this._map.get(`${x}:${y}`);
  }

  remove(point: Point): boolean {
    const { x, y } = point;
    return this._map.delete(`${x}:${y}`);
  }

  *[Symbol.iterator](): IterableIterator<Placement> {
    for (const [key, pixel] of this._map.entries()) {
      const [x, y] = key.split(":").map(Number);
      yield { position: { x, y }, pixel };
    }
  }

  toPlacements(): Placement[] {
    const placements: Placement[] = [];
    for (const [key, pixel] of this._map) {
      const [x, y] = key.split(":").map(Number);
      placements.push({ position: { x, y }, pixel });
    }
    return placements;
  }

  toJSON(): Placement[] {
    return this.toPlacements();
  }
}
