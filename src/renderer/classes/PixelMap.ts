import { Pixel, Placement, Point } from "../types.ts";

export class PixelMap {
  private readonly innerMap: Map<string, Pixel>;
  public minX: number;
  public minY: number;
  public maxX: number;
  public maxY: number;

  constructor() {
    this.innerMap = new Map();
    this.minX = Infinity;
    this.minY = Infinity;
    this.maxX = -Infinity;
    this.maxY = -Infinity;
  }

  static fromPlacements(placements: Placement[]) {
    const pixelMap = new PixelMap();
    for (const placement of placements) {
      pixelMap.set(placement.position, placement.pixel);
    }
    return pixelMap;
  }

  get size(): number {
    return this.innerMap.size;
  }

  set(point: Point, pixel: Pixel) {
    const { x, y } = point;
    this.innerMap.set(`${x}:${y}`, pixel);

    this.minX = Math.min(this.minX, x);
    this.minY = Math.min(this.minY, y);
    this.maxX = Math.max(this.maxX, x);
    this.maxY = Math.max(this.maxY, y);
  }

  get(point: Point): Pixel | undefined {
    const { x, y } = point;
    return this.innerMap.get(`${x}:${y}`);
  }

  remove(point: Point): boolean {
    const { x, y } = point;
    return this.innerMap.delete(`${x}:${y}`);
  }

  *[Symbol.iterator](): IterableIterator<Placement> {
    for (const [key, pixel] of this.innerMap.entries()) {
      const [x, y] = key.split(":").map(Number);
      yield { position: { x, y }, pixel };
    }
  }

  toPlacements(): Placement[] {
    const placements: Placement[] = [];
    for (const [key, pixel] of this.innerMap) {
      const [x, y] = key.split(":").map(Number);
      placements.push({ position: { x, y }, pixel });
    }
    return placements;
  }

  toJSON(): Placement[] {
    return this.toPlacements();
  }
}