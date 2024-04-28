import { Render } from "../../../renderer/types.ts";
import createRender from "../../../renderer/modifiers/createRender.ts";

export default function renderEmpty(): Render {
  return createRender([]);
}
