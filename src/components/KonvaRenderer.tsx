import { Group as KonvaGroup, Layer, Rect, Stage } from "react-konva";
import { ReactNode } from "react";

import { Group } from "./types.ts";

export type KonvaRendererProps = {
  scene: Group;
  canvasWidth: number;
  canvasHeight: number;
  scale?: number;
};

const renderGroup = (group: Group, key: number, scale: number): ReactNode => {
  if (group.type === "group") {
    const { anchor, groups } = group;

    return (
      <KonvaGroup key={key} x={anchor.x * scale} y={anchor.y * scale}>
        {groups.map((subGroup, index) => renderGroup(subGroup, index, scale))}
      </KonvaGroup>
    );
  } else {
    return renderLeaf(group, key, scale);
  }
};

const renderLeaf = (leaf: Group, key: number, scale: number): ReactNode => {
  if (leaf.type === "leaf") {
    const { anchor, pixels } = leaf;

    return (
      <KonvaGroup key={key} x={anchor.x * scale} y={anchor.y * scale}>
        {pixels.map((pixel, index) => (
          <Rect
            key={index}
            x={pixel.position.x * scale}
            y={pixel.position.y * scale}
            width={scale}
            height={scale}
            fill={`rgba(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b}, ${
              pixel.color.a ?? 1
            })`}
          />
        ))}
      </KonvaGroup>
    );
  } else {
    return renderGroup(leaf, key, scale);
  }
};

function KonvaRenderer({
  canvasWidth,
  canvasHeight,
  scale = 1,
  scene,
}: KonvaRendererProps): ReactNode {
  return (
    <Stage width={canvasWidth * scale} height={canvasHeight * scale}>
      <Layer>
        {/* Fill */}
        <Rect
          x={0}
          y={0}
          width={canvasWidth * scale}
          height={canvasHeight * scale}
          fill="white"
        />

        {/* Scene */}
        {renderGroup(scene, 0, scale)}
      </Layer>
    </Stage>
  );
}

export default KonvaRenderer;
