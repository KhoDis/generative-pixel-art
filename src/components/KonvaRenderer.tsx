import { Group as KonvaGroup, Layer, Rect, Stage } from "react-konva";
import { ReactNode } from "react";

import { Blot, Group, Sprite } from "../renderer/types.ts";

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
  } else if (group.type === "blot") {
    return renderBlot(group, key, scale);
  } else if (group.type === "sprite") {
    return renderSprite(group, key, scale);
  } else {
    return null;
  }
};

const renderBlot = (blot: Blot, key: number, scale: number): ReactNode => {
  const { anchor, pixels } = blot;

  return (
    <KonvaGroup key={key} x={anchor.x * scale} y={anchor.y * scale}>
      {pixels.map((pixel, index) => (
        <Rect
          key={index}
          x={pixel.position.x * scale}
          y={pixel.position.y * scale}
          width={scale}
          height={scale}
          fill={`rgba(${pixel.pixel.r}, ${pixel.pixel.g}, ${pixel.pixel.b}, ${
            pixel.pixel.a ?? 1
          })`}
        />
      ))}
    </KonvaGroup>
  );
};

const renderSprite = (
  sprite: Sprite,
  key: number,
  scale: number,
): ReactNode => {
  const { anchor, matrix } = sprite;

  return (
    <KonvaGroup key={key} x={anchor.x * scale} y={anchor.y * scale}>
      {matrix.map((row, rowIndex) =>
        row.map(
          (pixel, columnIndex) =>
            pixel && (
              <Rect
                key={`${rowIndex}-${columnIndex}`}
                x={columnIndex * scale}
                y={rowIndex * scale}
                width={scale}
                height={scale}
                fill={`rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${
                  pixel.a ?? 1
                })`}
              />
            ),
        ),
      )}
    </KonvaGroup>
  );
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
