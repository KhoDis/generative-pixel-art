import colors from "../../palettes/html.ts";
import removeTransparent from "./removeTransparent.ts";
import { place } from "../../factories";
import { draw } from "../primitives";

const origin = colors.black;
const fill = colors.red;

describe("removeTransparent", () => {
  it("should remove fully transparent pixels", () => {
    const shape1 = draw(
      place(origin, 0, 0),
      place({ ...fill, a: 0 }, 1, 0), // transparent pixel
      place(fill, 0, 1),
      place(fill, 1, 1),
    );
    const cleaned = removeTransparent(shape1);

    expect(cleaned).toEqual(
      draw(place(origin, 0, 0), place(fill, 0, 1), place(fill, 1, 1)),
    );
  });

  it("should not remove non-transparent pixels", () => {
    const shape1 = draw(
      place(origin, 0, 0),
      place(fill, 1, 0),
      place(fill, 0, 1),
      place(fill, 1, 1),
    );
    const cleaned = removeTransparent(shape1);

    expect(cleaned).toEqual(shape1);
  });

  it("should return an empty shape when all pixels are transparent", () => {
    const shape1 = draw(
      place({ ...origin, a: 0 }, 0, 0), // transparent pixel
      place({ ...fill, a: 0 }, 1, 0), // transparent pixel
      place({ ...fill, a: 0 }, 0, 1), // transparent pixel
      place({ ...fill, a: 0 }, 1, 1), // transparent pixel
    );
    const cleaned = removeTransparent(shape1);

    expect(cleaned).toEqual(draw());
  });
});
