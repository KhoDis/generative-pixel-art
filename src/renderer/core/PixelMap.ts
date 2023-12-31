import { Pixel, Placement, Point } from "../types.ts";

/**
 * A map of pixels. Uses a string key of the form "x:y" to store pixels.
 */
export class PixelMap {
  private readonly _map: Map<string, Pixel>;
  public bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };

  /**
   * Creates a new PixelMap.
   * @param placements - The placements to initialize the map with.
   */
  constructor(placements: Placement[] = []) {
    this._map = new Map();
    for (const placement of placements) {
      this.set(placement.position, placement.pixel);
    }
  }

  /**
   * Gets the number of pixels in the map.
   */
  get size(): number {
    return this._map.size;
  }

  /**
   * Sets a pixel at the given point.
   * @param point - The point where the pixel should be placed.
   * @param pixel - The pixel to be placed.
   */
  set(point: Point, pixel: Pixel) {
    const { x, y } = point;
    this._map.set(`${x}:${y}`, pixel);

    this.bounds.minX = Math.min(this.bounds.minX, x);
    this.bounds.minY = Math.min(this.bounds.minY, y);
    this.bounds.maxX = Math.max(this.bounds.maxX, x);
    this.bounds.maxY = Math.max(this.bounds.maxY, y);
  }

  /**
   * Gets the pixel at the given point.
   * @param point - The point of the pixel to get.
   * @returns The pixel at the given point, or undefined if no pixel is found.
   */
  get(point: Point): Pixel | undefined {
    const { x, y } = point;
    return this._map.get(`${x}:${y}`);
  }

  /**
   * Removes the pixel at the given point.
   *
   * Note that the min and max coordinates are not updated, because this is an expensive operation.
   * @param point - The point of the pixel to remove.
   * @returns True if the pixel is found and removed; otherwise, false.
   */
  remove(point: Point): boolean {
    const { x, y } = point;
    return this._map.delete(`${x}:${y}`);
  }

  /**
   * Checks if the map contains a pixel at the given point.
   * @param point - The point to check.
   * @returns True if the map contains a pixel at the given point; otherwise, false.
   */
  has(point: Point): boolean {
    const { x, y } = point;
    return this._map.has(`${x}:${y}`);
  }

  /**
   * Checks if the map contains a pixel with the given position.
   * @param point - The position to check.
   * @returns True if the map contains a pixel with the given position; otherwise, false.
   */
  inBounds(point: Point): boolean {
    const { x, y } = point;
    return (
      x >= this.bounds.minX &&
      x <= this.bounds.maxX &&
      y >= this.bounds.minY &&
      y <= this.bounds.maxY
    );
  }

  /**
   * Returns an iterator that iterates through the placements in the map.
   * @returns An iterator for the placements in the map.
   */
  *[Symbol.iterator](): IterableIterator<Placement> {
    for (const [key, pixel] of this._map.entries()) {
      const [x, y] = key.split(":").map(Number);
      yield { position: { x, y }, pixel };
    }
  }

  /**
   * Converts the map to an array of placements.
   * @returns An array of placements.
   */
  toPlacements(): Placement[] {
    const placements: Placement[] = [];
    for (const [key, pixel] of this._map) {
      const [x, y] = key.split(":").map(Number);
      placements.push({ position: { x, y }, pixel });
    }
    return placements;
  }

  /**
   * Converts the map to JSON. Used for serialization.
   * @returns The JSON representation of the map.
   */
  toJSON(): Placement[] {
    return this.toPlacements();
  }

  /**
   * Creates a clone of the map.
   * @returns A clone of the map.
   */
  clone(): PixelMap {
    const clone = new PixelMap();
    for (const [key, pixel] of this._map.entries()) {
      const [x, y] = key.split(":").map(Number);
      clone.set({ x, y }, pixel);
    }
    return clone;
  }
}
