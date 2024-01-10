import { PixelMap } from "./PixelMap.ts";

describe("PixelMap", () => {
  let pixelMap: PixelMap;
  const fill = { r: 0, g: 0, b: 0 };

  beforeEach(() => {
    pixelMap = new PixelMap();
  });

  describe("set", () => {
    it("should set a pixel at a specified position", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      expect(pixelMap.get({ x: 1, y: 2 })).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe("get", () => {
    it("should get a pixel at a specified position", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      expect(pixelMap.get({ x: 1, y: 2 })).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe("remove", () => {
    it("should remove a pixel at a specified position", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      pixelMap.remove({ x: 1, y: 2 });
      expect(pixelMap.get({ x: 1, y: 2 })).toBeUndefined();
    });
  });

  describe("has", () => {
    it("should check if a pixel exists at a specified position", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      expect(pixelMap.has({ x: 1, y: 2 })).toBe(true);
    });
  });

  describe("inBounds", () => {
    it("should check if a position is within the bounds of the pixel map", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      expect(pixelMap.inBounds({ x: 1, y: 2 })).toBe(true);
      expect(pixelMap.inBounds({ x: 3, y: 4 })).toBe(false);
    });
  });

  describe("toPlacements", () => {
    it("should convert the map to an array of placements", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      const placements = pixelMap.toPlacements();
      expect(placements).toEqual([
        { position: { x: 1, y: 2 }, pixel: { r: 0, g: 0, b: 0 } },
      ]);
    });
  });

  describe("clone", () => {
    it("should create a clone of the pixel map", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      const clone = pixelMap.clone();
      expect(clone.get({ x: 1, y: 2 })).toEqual({ r: 0, g: 0, b: 0 });
      clone.remove({ x: 1, y: 2 });
      expect(clone.get({ x: 1, y: 2 })).toBeUndefined();
      expect(pixelMap.get({ x: 1, y: 2 })).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe("toJSON", () => {
    it("should convert the map to JSON", () => {
      pixelMap.set({ x: 1, y: 2 }, { r: 0, g: 0, b: 0 });
      const json = JSON.stringify(pixelMap);
      expect(json).toEqual(
        '[{"position":{"x":1,"y":2},"pixel":{"r":0,"g":0,"b":0}}]',
      );
    });
  });

  describe("width and height", () => {
    it("should return the width and height of the pixel map", () => {
      pixelMap.set({ x: 1, y: 2 }, fill);
      pixelMap.set({ x: 3, y: 4 }, fill);
      expect(pixelMap.width).toBe(3);
      expect(pixelMap.height).toBe(3);
    });
  });
});
