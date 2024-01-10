import colors from "../../palettes/html.ts";
import flatten from "./flatten.ts";
import { pixel } from "../shapes";
import { group, move } from "../builders";
import { combine, draw, place, point as p } from "../../factories";

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
      const shape1 = pixel(origin, p(1, 1));
      const grouped = move(shape1, p(1, 1));
      const flattened = flatten(grouped);

      expect(flattened).toEqual(pixel(origin, p(2, 2)));
    });
    it("group of pixels", () => {
      const shape1 = draw(place(origin, 1, 1), place(fill, 2, 1));
      const grouped = move(shape1, p(1, 1));
      const flattened = flatten(grouped);

      expect(flattened).toEqual(draw(place(origin, 2, 2), place(fill, 3, 2)));
    });
    it("group with multiple shapes", () => {
      const shape1 = pixel(origin, p(1, 1));
      const shape2 = pixel(fill, p(2, 2));
      const grouped = combine(shape1, shape2);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(draw(place(origin, 1, 1), place(fill, 2, 2)));
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, p(1, 1));
      const grouped = move(shape1, p(1, 1));
      const nested = move(grouped, p(1, 1));
      const flattened = flatten(nested);

      expect(flattened).toEqual(pixel(origin, p(3, 3)));
    });
  });

  describe("medium", () => {
    it("a square", () => {
      const shape1 = draw(
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
      const shape1 = draw(
        place(origin, -1, -1),
        place(fill, 0, -1),
        place(fill, -1, 0),
        place(fill, 0, 0),
      );
      const flattened = flatten(shape1);

      expect(flattened).toEqual(shape1);
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, p(2, 2));
      const grouped = move(shape1, p(1, 1));
      const nested = combine(grouped, grouped);
      const flattened = flatten(nested);

      expect(flattened).toEqual(pixel(origin, p(3, 3)));
    });
  });

  describe("hard", () => {
    it("group with multiple pixels on same position", () => {
      const shape1 = pixel(origin, p(1, 1));
      const shape2 = pixel(fill, p(2, 2));
      const shape11 = pixel(origin, p(1, 1));
      const shape22 = pixel(fill, p(2, 2));
      const grouped = combine(shape1, shape2, shape11, shape22);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(draw(place(origin, 1, 1), place(fill, 2, 2)));
    });
    it("group with nested groups", () => {
      const shape1 = pixel(origin, p(1, 1));
      const shape2 = pixel(fill, p(2, 2));

      const nested1 = group([shape1, shape1], p(1, 1));
      const nested2 = group([shape2, shape2], p(2, 2));

      const grouped = combine(nested1, nested2);
      const flattened = flatten(grouped);

      expect(flattened).toEqual(draw(place(origin, 2, 2), place(fill, 4, 4)));
    });
    it("move flattened group back and forth", () => {
      const shape1 = pixel(origin, p(1, 1));
      const shape2 = pixel(fill, p(2, 2));

      const grouped = combine(shape1, shape2);
      const flattened = flatten(grouped);

      const moved = move(flattened, p(1, 1));
      const flattenedMoved = flatten(moved);

      const movedBack = move(flattenedMoved, p(-1, -1));
      const flattenedMovedBack = flatten(movedBack);

      expect(flattened).toEqual(flattenedMovedBack);
    });
    it("empty group", () => {
      const empty = group([]);
      const flattened = flatten(empty);

      expect(flattened).toEqual(draw());
    });
  });
});
