import colors from "../colors.ts";
import { blot, place, sprite } from "../builders.ts";
import { convertBlotToSprite, convertSpriteToBlot } from "./conversion.ts";

const origin = colors.black;
const fill = colors.red;
const direction = colors.blue;

describe("conversion", () => {
  describe("convertBlotToSprite", () => {
    describe("should correctly convert", () => {
      it("a single pixel", () => {
        const blotShape = blot([place(0, 0, origin)]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([[origin]]);
        expect(spriteShape.anchor).toEqual({ x: 0, y: 0 });
      });
      it("a single pixel with offset", () => {
        const blotShape = blot([place(1, 1, origin)]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([[origin]]);
        expect(spriteShape.anchor).toEqual({ x: 1, y: 1 });
      });
      it("a single pixel with negative offset", () => {
        const blotShape = blot([place(-1, -1, origin)]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([[origin]]);
        expect(spriteShape.anchor).toEqual({ x: -1, y: -1 });
      });
      it("a square", () => {
        const blotShape = blot([
          place(0, 0, origin),
          place(1, 0, fill),
          place(0, 1, fill),
          place(1, 1, fill),
        ]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([
          [origin, fill],
          [fill, fill],
        ]);
        expect(spriteShape.anchor).toEqual({ x: 0, y: 0 });
      });
      it("a square with offset", () => {
        const blotShape = blot([
          place(1, 1, origin),
          place(2, 1, fill),
          place(1, 2, fill),
          place(2, 2, fill),
        ]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([
          [origin, fill],
          [fill, fill],
        ]);
        expect(spriteShape.anchor).toEqual({ x: 1, y: 1 });
      });
      it("a star", () => {
        const blotShape = blot([
          place(0, 0, origin),
          place(1, 0, fill),
          place(2, 0, fill),
          place(-1, 0, fill),
          place(-2, 0, fill),
          place(0, 1, fill),
          place(0, 2, direction),
          place(0, -1, fill),
          place(0, -2, fill),
          place(1, 1, fill),
          place(1, -1, fill),
          place(-1, 1, fill),
          place(-1, -1, fill),
        ]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([
          [null, null, fill, null, null],
          [null, fill, fill, fill, null],
          [fill, fill, origin, fill, fill],
          [null, fill, fill, fill, null],
          [null, null, direction, null, null],
        ]);
        expect(spriteShape.anchor).toEqual({ x: -2, y: -2 });
      });
      it("an empty blot", () => {
        const blotShape = blot([]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([]);
        expect(spriteShape.anchor).toEqual({ x: 0, y: 0 });
      });
      it("a repeated pixel", () => {
        const blotShape = blot([
          place(0, 0, origin),
          place(0, 0, fill),
          place(0, 0, direction),
        ]);
        const spriteShape = convertBlotToSprite(blotShape);

        expect(spriteShape.matrix).toEqual([[direction]]);
        expect(spriteShape.anchor).toEqual({ x: 0, y: 0 });
      });
    });
  });

  describe("convertSpriteToBlot", () => {
    describe("should correctly convert", () => {
      it("a single pixel", () => {
        const spriteShape = sprite([[origin]]);
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(blot([place(0, 0, origin)]));
      });
      it("a square", () => {
        const spriteShape = sprite([
          [origin, fill],
          [fill, fill],
        ]);
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(
          blot([
            place(0, 0, origin),
            place(1, 0, fill),
            place(0, 1, fill),
            place(1, 1, fill),
          ]),
        );
      });
      it("an empty sprite", () => {
        const spriteShape = sprite([]);
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(blot([]));
      });
      it("a sprite with nulls", () => {
        const spriteShape = sprite([
          [origin, fill],
          [null, fill],
        ]);
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(
          blot([place(0, 0, origin), place(1, 0, fill), place(1, 1, fill)]),
        );
      });
      it("a sprite with offset", () => {
        const spriteShape = sprite(
          [
            [origin, fill],
            [fill, fill],
          ],
          { x: 1, y: 1 },
        );
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(
          blot([
            place(1, 1, origin),
            place(2, 1, fill),
            place(1, 2, fill),
            place(2, 2, fill),
          ]),
        );
      });
      it("a sprite with negative offset", () => {
        const spriteShape = sprite(
          [
            [origin, fill],
            [fill, fill],
          ],
          { x: -1, y: -1 },
        );
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(
          blot([
            place(-1, -1, origin),
            place(0, -1, fill),
            place(-1, 0, fill),
            place(0, 0, fill),
          ]),
        );
      });
      it("a star", () => {
        const spriteShape = sprite(
          [
            [null, null, fill, null, null],
            [null, fill, fill, fill, null],
            [fill, fill, origin, fill, fill],
            [null, fill, fill, fill, null],
            [null, null, direction, null, null],
          ],
          { x: -2, y: -2 },
        );
        const blotShape = convertSpriteToBlot(spriteShape);

        expect(blotShape).toEqual(
          blot([
            place(0, -2, fill),
            place(-1, -1, fill),
            place(0, -1, fill),
            place(1, -1, fill),
            place(-2, 0, fill),
            place(-1, 0, fill),
            place(0, 0, origin),
            place(1, 0, fill),
            place(2, 0, fill),
            place(-1, 1, fill),
            place(0, 1, fill),
            place(1, 1, fill),
            place(0, 2, direction),
          ]),
        );
      });
    });
  });
});
