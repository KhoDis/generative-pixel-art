import trim from "./trim";
import { pixel } from "../shapes";
import colors from "../palettes/html.ts";
import { place, shape } from "../builders.ts";

const origin = colors.black;
const fill = colors.red;

describe("should correctly trim", () => {
  it("a single pixel", () => {
    const shape1 = pixel(origin, 1, 1);
    const trimmed = trim(shape1);

    expect(trimmed).toEqual(pixel(origin, 0, 0));
  });
  it("a square", () => {
    const shape1 = shape(
      place(origin, 1, 1),
      place(fill, 2, 1),
      place(fill, 1, 2),
      place(fill, 2, 2),
    );
    const trimmed = trim(shape1);

    expect(trimmed).toEqual(
      shape(
        place(origin, 0, 0),
        place(fill, 1, 0),
        place(fill, 0, 1),
        place(fill, 1, 1),
      ),
    );
  });
  it("a square with negative offset", () => {
    const shape1 = shape(
      place(origin, -1, -1),
      place(fill, 0, -1),
      place(fill, -1, 0),
      place(fill, 0, 0),
    );
    shape1.pixels.bounds = { minX: -100, minY: -100, maxX: 100, maxY: 100 };
    const trimmed = trim(shape1);

    const expected = shape(
      place(origin, 0, 0),
      place(fill, 1, 0),
      place(fill, 0, 1),
      place(fill, 1, 1),
    );
    expect(trimmed).toEqual(expected);
  });
});
