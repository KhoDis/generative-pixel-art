import trim from "./trim.ts";
import { draw, pixel } from "../primitives";
import colors from "../../palettes/html.ts";
import { place, point } from "../../factories";

const origin = colors.black;
const fill = colors.red;

describe("should correctly trim", () => {
  it("a single pixel", () => {
    const shape1 = pixel(origin, point(1, 1));
    const trimmed = trim(shape1);

    expect(trimmed).toEqual(pixel(origin));
  });
  it("a square", () => {
    const shape1 = draw(
      place(origin, 1, 1),
      place(fill, 2, 1),
      place(fill, 1, 2),
      place(fill, 2, 2),
    );
    const trimmed = trim(shape1);

    expect(trimmed).toEqual(
      draw(
        place(origin, 0, 0),
        place(fill, 1, 0),
        place(fill, 0, 1),
        place(fill, 1, 1),
      ),
    );
  });
  it("a square with negative offset", () => {
    const shape1 = draw(
      place(origin, -1, -1),
      place(fill, 0, -1),
      place(fill, -1, 0),
      place(fill, 0, 0),
    );
    shape1.pixels.bounds = { minX: -100, minY: -100, maxX: 100, maxY: 100 };
    const trimmed = trim(shape1);

    const expected = draw(
      place(origin, 0, 0),
      place(fill, 1, 0),
      place(fill, 0, 1),
      place(fill, 1, 1),
    );
    expect(trimmed).toEqual(expected);
  });
});
