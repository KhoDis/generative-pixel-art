import { Render } from "../../renderer/types.ts";
import KonvaRenderer from "./KonvaRenderer.tsx";
import { useAppSelector } from "../../redux/hooks.ts";
import { selectRendered } from "../../redux/slice.ts";

export function Canvas() {
  const render: Render = useAppSelector((state) => selectRendered(state));

  return (
    <KonvaRenderer
      canvasHeight={50}
      canvasWidth={30}
      scale={15}
      render={render}
    />
  );
}
