import colors from "../colors.ts";
import { combine, group, move, place, shape } from "../builders.ts";
import { flatten } from "./flatten.ts";
import { pixel } from "../shapes";

const origin = colors.black;
const fill = colors.red;

describe("should correctly flatten", () => {
  describe("easy", () => {
    it("a single pixel", () => {
      const shape1 = pixel(origin);
      const grouped = move(shape1);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(pixel(origin));
    });
    it("a single pixel with offset", () => {
      const shape1 = pixel(origin, 1, 1);
      const grouped = move(shape1, 1, 1);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(pixel(origin, 2, 2));
    });
    it("group of pixels", () => {
      const shape1 = shape(place(origin, 1, 1), place(fill, 2, 1));
      const grouped = move(shape1, 1, 1);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(shape(place(origin, 2, 2), place(fill, 3, 2)));
    });
    it("group with multiple shapes", () => {
      const shape1 = pixel(origin, 1, 1);
      const shape2 = pixel(fill, 2, 2);
      const grouped = combine(shape1, shape2);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(shape(place(origin, 1, 1), place(fill, 2, 2)));
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, 1, 1);
      const grouped = move(shape1, 1, 1);
      const nested = move(grouped, 1, 1);
      const flattened = flatten(nested);

      expect(flattened).toEqual(pixel(origin, 3, 3));
    });
  });

  describe("medium", () => {
    it("a square", () => {
      const shape1 = shape(
        place(origin, 0, 0),
        place(fill, 1, 0),
        place(fill, 0, 1),
        place(fill, 1, 1),
      );
      const grouped = move(shape1);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(shape1);
    });
    it("a square with negative offset", () => {
      const shape1 = shape(
        place(origin, -1, -1),
        place(fill, 0, -1),
        place(fill, -1, 0),
        place(fill, 0, 0),
      );
      const flattened = flatten(shape1);

      expect(flattened).toEqual(shape1);
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, 2, 2);
      const grouped = move(shape1, 1, 1);
      const nested = combine(grouped, grouped);
      const flattened = flatten(nested);

      expect(flattened).toEqual(pixel(origin, 3, 3));
    });
  });

  describe("hard", () => {
    it("group with multiple pixels on same position", () => {
      const shape1 = pixel(origin, 1, 1);
      const shape2 = pixel(fill, 2, 2);
      const shape11 = pixel(origin, 1, 1);
      const shape22 = pixel(fill, 2, 2);
      const grouped = combine(shape1, shape2, shape11, shape22);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(shape(place(origin, 1, 1), place(fill, 2, 2)));
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, 1, 1);
      const shape2 = pixel(fill, 2, 2);

      const nested1 = group([shape1, shape1], 1, 1);
      const nested2 = group([shape2, shape2], 2, 2);

      const grouped = combine(nested1, nested2);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(shape(place(origin, 2, 2), place(fill, 4, 4)));
    });
    it("move flattened group back and forth", () => {
      const shape1 = pixel(origin, 1, 1);
      const shape2 = pixel(fill, 2, 2);

      const grouped = combine(shape1, shape2);
      const flattened = flatten(grouped);

      const moved = move(flattened, 1, 1);
      const flattenedMoved = flatten(moved);

      const movedBack = move(flattenedMoved, -1, -1);
      const flattenedMovedBack = flatten(movedBack);

      expect(flattened).toEqual(flattenedMovedBack);
    });
    it("empty group", () => {
      const empty = group([]);
      const flattened = flatten(empty);

      expect(flattened).toEqual(shape());
    });
  });
});
