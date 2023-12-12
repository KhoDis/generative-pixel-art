import colors from "../colors.ts";
import { at, blot, group, place, sprite } from "../builders.ts";
import { flattenToBlot, flattenToSprite } from "./flattening.ts";

const origin = colors.black;
const fill = colors.red;

describe("flattening", () => {
  describe("flattenToBlot", () => {
    describe("should correctly flatten sprite", () => {
      it("a single pixel", () => {
        const spriteShape = sprite([[origin]]);
        const blotShape = flattenToBlot(spriteShape);

        expect(blotShape).toEqual(blot([place(0, 0, origin)]));
      });
      it("a single pixel with offset", () => {
        const spriteShape = sprite([[origin]], { x: 1, y: 1 });
        const blotShape = flattenToBlot(spriteShape);

        expect(blotShape).toEqual(blot([place(1, 1, origin)]));
      });
      it("group of pixels", () => {
        const spriteShape = sprite([[origin, fill]], { x: 1, y: 1 });
        const groupShape = at(1, 1, spriteShape);
        const blotShape = flattenToBlot(groupShape);

        expect(blotShape).toEqual(
          blot([place(2, 2, origin), place(3, 2, fill)]),
        );
      });
      it("group with multiple sprites", () => {
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const groupShape = group([spriteShape1, spriteShape2]);
        const blotShape = flattenToBlot(groupShape);

        expect(blotShape).toEqual(
          blot([place(1, 1, origin), place(2, 2, fill)]),
        );
      });
      it("group with nested groups", () => {
        const spriteShape = sprite([[origin]], { x: 1, y: 1 });
        const nestedGroup = group([spriteShape], { x: 1, y: 1 });
        const groupShape = group([nestedGroup]);
        const blotShape = flattenToBlot(groupShape);

        expect(blotShape).toEqual(blot([place(2, 2, origin)]));
      });
    });
    describe("should correctly flatten blot", () => {
      it("a single pixel", () => {
        const blotShape = blot([place(0, 0, origin)]);
        const flattenedBlot = flattenToBlot(blotShape);

        expect(flattenedBlot).toEqual(blotShape);
      });
      it("a single pixel with offset", () => {
        const blotShape = blot([place(1, 1, origin)]);
        const flattenedBlot = flattenToBlot(blotShape);

        expect(flattenedBlot).toEqual(blotShape);
      });
      it("a square", () => {
        const blotShape = blot([
          place(0, 0, origin),
          place(1, 0, fill),
          place(0, 1, fill),
          place(1, 1, fill),
        ]);
        const flattenedBlot = flattenToBlot(blotShape);

        expect(flattenedBlot).toEqual(blotShape);
      });
      it("a square with offset", () => {
        const blotShape = blot([
          place(1, 1, origin),
          place(2, 1, fill),
          place(1, 2, fill),
          place(2, 2, fill),
        ]);
        const flattenedBlot = flattenToBlot(blotShape);

        expect(flattenedBlot).toEqual(blotShape);
      });
      it("group of pixels", () => {
        const blotShape = blot([place(1, 1, origin), place(2, 1, fill)]);
        const groupShape = group([blotShape], { x: 1, y: 1 });
        const flattenedBlot = flattenToBlot(groupShape);

        expect(flattenedBlot).toEqual(
          blot([place(2, 2, origin), place(3, 2, fill)]),
        );
      });
      it("group with multiple blots", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const groupShape = group([blotShape1, blotShape2]);
        const flattenedBlot = flattenToBlot(groupShape);

        expect(flattenedBlot).toEqual(
          blot([place(1, 1, origin), place(2, 2, fill)]),
        );
      });
      it("group with nested groups", () => {
        const blotShape = blot([place(2, 2, origin)]);
        const nestedGroup = group([blotShape], { x: 1, y: 1 });
        const groupShape = group([nestedGroup]);
        const flattenedBlot = flattenToBlot(groupShape);

        expect(flattenedBlot).toEqual(blot([place(3, 3, origin)]));
      });
    });
    describe("should correctly flatten advanced", () => {
      it("group with multiple blots and sprites", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const groupShape = group([
          blotShape1,
          blotShape2,
          spriteShape1,
          spriteShape2,
        ]);
        const flattenedBlot = flattenToBlot(groupShape);

        console.log("flattenedBlot", flattenedBlot);

        console.log(
          "should be",
          blot([
            place(1, 1, origin),
            place(2, 2, fill),
            place(2, 2, origin),
            place(3, 3, fill),
          ]),
        );

        expect(flattenedBlot).toEqual(
          blot([place(1, 1, origin), place(2, 2, fill)]),
        );
      });
      it("group with nested groups", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const nestedGroup1 = group([blotShape1, spriteShape1], { x: 1, y: 1 });
        const nestedGroup2 = group([blotShape2, spriteShape2], { x: 2, y: 2 });
        const groupShape = group([nestedGroup1, nestedGroup2]);
        const flattenedBlot = flattenToBlot(groupShape);

        expect(flattenedBlot).toEqual(
          blot([place(2, 2, origin), place(4, 4, fill)]),
        );
      });
      it("move flattened group back and forth", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);

        const groupShape = group([blotShape1, blotShape2]);
        const originalBlot = flattenToBlot(groupShape);

        const movedGroup = group([originalBlot], { x: 1, y: 1 });
        const flattenedMovedGroup = flattenToBlot(movedGroup);

        const movedBackGroup = group([flattenedMovedGroup], { x: -1, y: -1 });
        const flattenedMovedBackGroup = flattenToBlot(movedBackGroup);

        expect(originalBlot).toEqual(flattenedMovedBackGroup);
      });
      it("empty group", () => {
        const groupShape = group([]);
        const flattenedBlot = flattenToBlot(groupShape);

        expect(flattenedBlot).toEqual(blot([]));
      });
    });
    describe("should throw error", () => {
      it("unsupported type", () => {
        const groupShape = { type: "unsupported" } as never;
        expect(() => flattenToBlot(groupShape)).toThrow(
          "Unsupported type: unsupported",
        );
      });
    });
  });

  describe("flattenToSprite", () => {
    describe("should correctly flatten blot", () => {
      it("a single pixel", () => {
        const blotShape = blot([place(0, 0, origin)]);
        const flattenedSprite = flattenToSprite(blotShape);

        expect(flattenedSprite).toEqual(sprite([[origin]]));
      });
      it("a single pixel with offset", () => {
        const blotShape = blot([place(1, 1, origin)]);
        const flattenedSprite = flattenToSprite(blotShape);

        expect(flattenedSprite).toEqual(sprite([[origin]], { x: 1, y: 1 }));
      });
      it("a square", () => {
        const blotShape = blot([
          place(0, 0, origin),
          place(1, 0, fill),
          place(0, 1, fill),
          place(1, 1, fill),
        ]);
        const flattenedSprite = flattenToSprite(blotShape);

        expect(flattenedSprite).toEqual(
          sprite([
            [origin, fill],
            [fill, fill],
          ]),
        );
      });
      it("a square with offset", () => {
        const blotShape = blot([
          place(1, 1, origin),
          place(2, 1, fill),
          place(1, 2, fill),
          place(2, 2, fill),
        ]);
        const flattenedSprite = flattenToSprite(blotShape);

        expect(flattenedSprite).toEqual(
          sprite(
            [
              [origin, fill],
              [fill, fill],
            ],
            { x: 1, y: 1 },
          ),
        );
      });
      it("group of pixels", () => {
        const blotShape = blot([place(1, 1, origin), place(2, 1, fill)]);
        const groupShape = group([blotShape], { x: 1, y: 1 });
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite([[origin, fill]], { x: 2, y: 2 }),
        );
      });
      it("group with multiple blots", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const groupShape = group([blotShape1, blotShape2]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite(
            [
              [origin, null],
              [null, fill],
            ],
            { x: 1, y: 1 },
          ),
        );
      });
      it("group with nested groups", () => {
        const blotShape = blot([place(2, 2, origin)]);
        const nestedGroup = group([blotShape], { x: 1, y: 1 });
        const groupShape = group([nestedGroup]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(sprite([[origin]], { x: 3, y: 3 }));
      });
    });
    describe("should correctly flatten sprite", () => {
      it("a single pixel", () => {
        const spriteShape = sprite([[origin]]);
        const flattenedSprite = flattenToSprite(spriteShape);

        expect(flattenedSprite).toEqual(spriteShape);
      });
      it("a single pixel with offset", () => {
        const spriteShape = sprite([[origin]], { x: 1, y: 1 });
        const flattenedSprite = flattenToSprite(spriteShape);

        expect(flattenedSprite).toEqual(spriteShape);
      });
      it("a square", () => {
        const spriteShape = sprite([
          [origin, fill],
          [fill, fill],
        ]);
        const flattenedSprite = flattenToSprite(spriteShape);

        expect(flattenedSprite).toEqual(spriteShape);
      });
      it("a square with offset", () => {
        const spriteShape = sprite(
          [
            [origin, fill],
            [fill, fill],
          ],
          { x: 1, y: 1 },
        );
        const flattenedSprite = flattenToSprite(spriteShape);

        expect(flattenedSprite).toEqual(spriteShape);
      });
      it("group of pixels", () => {
        const spriteShape = sprite([[origin, fill]], { x: 1, y: 1 });
        const groupShape = group([spriteShape], { x: 1, y: 1 });
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite([[origin, fill]], { x: 2, y: 2 }),
        );
      });
      it("group with multiple sprites", () => {
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const groupShape = group([spriteShape1, spriteShape2]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite(
            [
              [origin, null],
              [null, fill],
            ],
            { x: 1, y: 1 },
          ),
        );
      });
      it("group with nested groups", () => {
        const spriteShape = sprite([[origin]], { x: 1, y: 1 });
        const nestedGroup = group([spriteShape], { x: 1, y: 1 });
        const groupShape = group([nestedGroup]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(sprite([[origin]], { x: 2, y: 2 }));
      });
    });
    describe("should correctly flatten advanced group", () => {
      it("group with multiple blots and sprites", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const groupShape = group([
          blotShape1,
          blotShape2,
          spriteShape1,
          spriteShape2,
        ]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite(
            [
              [origin, null],
              [null, fill],
            ],
            { x: 1, y: 1 },
          ),
        );
      });
      it("group with nested groups", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);
        const spriteShape1 = sprite([[origin]], { x: 1, y: 1 });
        const spriteShape2 = sprite([[fill]], { x: 2, y: 2 });
        const nestedGroup1 = group([blotShape1, spriteShape1], { x: 1, y: 1 });
        const nestedGroup2 = group([blotShape2, spriteShape2], { x: 2, y: 2 });
        const groupShape = group([nestedGroup1, nestedGroup2], { x: 0, y: 0 });
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(
          sprite(
            [
              [origin, null, null],
              [null, null, null],
              [null, null, fill],
            ],
            { x: 2, y: 2 },
          ),
        );
      });
      it("move flattened group back and forth", () => {
        const blotShape1 = blot([place(1, 1, origin)]);
        const blotShape2 = blot([place(2, 2, fill)]);

        const groupShape = group([blotShape1, blotShape2]);
        const originalSprite = flattenToSprite(groupShape);

        const movedGroup = group([originalSprite], { x: 1, y: 1 });
        const flattenedMovedGroup = flattenToSprite(movedGroup);

        const movedBackGroup = group([flattenedMovedGroup], { x: -1, y: -1 });
        const flattenedMovedBackGroup = flattenToSprite(movedBackGroup);

        expect(originalSprite).toEqual(flattenedMovedBackGroup);
      });
      it("empty group", () => {
        const groupShape = group([]);
        const flattenedSprite = flattenToSprite(groupShape);

        expect(flattenedSprite).toEqual(sprite([]));
      });
    });
  });
});
