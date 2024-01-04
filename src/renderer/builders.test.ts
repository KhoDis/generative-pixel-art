import { Figure, Pixel, Placement } from "./types.ts";
import { combine, group, move, place, point, shape } from "./builders.ts";
import { PixelMap } from "./core/PixelMap.ts";

describe('builders', () => {
  describe('group', () => {
    it('should group figures at a specified position', () => {
      const figures: Figure[] = [{ type: 'shape', pixels: new PixelMap() }, { type: 'group', figures: [], anchor: { x: 0, y: 0 } }];
      const result = group(figures, 1, 2);
      expect(result).toEqual({ type: 'group', figures, anchor: { x: 1, y: 2 } });
    });
  });

  describe('combine', () => {
    it('should combine multiple figures into a group', () => {
      const figures: Figure[] = [{ type: 'shape', pixels: new PixelMap() }, { type: 'group', figures: [], anchor: { x: 0, y: 0 } }];
      const result = combine(...figures);
      expect(result).toEqual({ type: 'group', figures, anchor: { x: 0, y: 0 } });
    });
  });

  describe('move', () => {
    it('should move a shape to a specified position', () => {
      const figure: Figure = { type: 'shape', pixels: new PixelMap() };
      const result = move(figure, 1, 2);
      expect(result).toEqual({ type: 'group', figures: [figure], anchor: { x: 1, y: 2 } });
    });
    it('should move a group to a specified position', () => {
      const figure: Figure = { type: 'group', figures: [], anchor: { x: 0, y: 0 } };
      const result = move(figure, 1, 2);
      expect(result).toEqual({ type: 'group', figures: [], anchor: { x: 1, y: 2 } });
    });
  });

  describe('shape', () => {
    it('should create a shape from a set of placements', () => {
      const placements: Placement[] = [{ position: { x: 1, y: 1 }, pixel: { r: 0, g: 0, b: 0 } }];
      const result = shape(...placements);

      const pixels = new PixelMap();
      pixels.set({ x: 1, y: 1 }, { r: 0, g: 0, b: 0 });
      expect(result).toEqual({ type: 'shape', pixels });
    });
  });

  describe('place', () => {
    it('should place a pixel at a specified position', () => {
      const pixel: Pixel = { r: 0, g: 0, b: 0 };
      const result = place(pixel, 1, 2);
      expect(result).toEqual({ position: { x: 1, y: 2 }, pixel });
    });
    it('should place a pixel at 0, 0 if no position is specified', () => {
      const pixel: Pixel = { r: 0, g: 0, b: 0 };
      const result = place(pixel);
      expect(result).toEqual({ position: { x: 0, y: 0 }, pixel });
    });
  });

  describe('point', () => {
    it('should create a point', () => {
      const result = point(1, 2);
      expect(result).toEqual({ x: 1, y: 2 });
    });
  });
});