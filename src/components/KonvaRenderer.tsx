import { Group as KonvaGroup, Layer, Rect, Stage } from "react-konva";
import { ReactNode } from "react";

import { Shape, Figure } from "../renderer/types.ts";

export type KonvaRendererProps = {
  scene: Figure;
  canvasWidth: number;
  canvasHeight: number;
  scale?: number;
  addGrid?: boolean;
};

const renderGroup = (figure: Figure, key: number, scale: number): ReactNode => {
  if (figure.type === "group") {
    const { anchor, figures } = figure;

    return (
      <KonvaGroup key={key} x={anchor.x * scale} y={anchor.y * scale}>
        {figures.map((subGroup, index) => renderGroup(subGroup, index, scale))}
      </KonvaGroup>
    );
  } else if (figure.type === "shape") {
    return renderShape(figure, key, scale);
  } else {
    return null;
  }
};

const renderShape = (shape: Shape, key: number, scale: number): ReactNode => {
  const { pixels } = shape;

  return (
    <KonvaGroup key={key} x={0} y={0}>
      {pixels.toPlacements().map((pixel, index) => (
        <Rect
          key={index}
          x={pixel.position.x * scale}
          y={pixel.position.y * scale}
          width={scale}
          height={scale}
          fill={`rgba(${pixel.pixel.r}, ${pixel.pixel.g}, ${pixel.pixel.b}, ${
            (pixel.pixel.a ?? 255) / 255
          })`}
        />
      ))}
    </KonvaGroup>
  );
};

function Grid({
  width,
  height,
  scale,
}: {
  width: number;
  height: number;
  scale: number;
}) {
  return (
    <>
      {Array.from({ length: width }, (_, x) => (
        <Rect
          key={x}
          x={x * scale}
          y={0}
          width={1}
          height={height * scale}
          fill="rgba(0, 0, 0, 0.1)"
        />
      ))}
      {Array.from({ length: height }, (_, y) => (
        <Rect
          key={y}
          x={0}
          y={y * scale}
          width={width * scale}
          height={1}
          fill="rgba(0, 0, 0, 0.1)"
        />
      ))}
    </>
  );
}

function KonvaRenderer({
  canvasWidth,
  canvasHeight,
  scale = 1,
  scene,
  addGrid = true,
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

        {/* Grid */}
        {addGrid && (
          <Grid width={canvasWidth} height={canvasHeight} scale={scale} />
        )}

        {/* Scene */}
        {renderGroup(scene, 0, scale)}
      </Layer>
    </Stage>
  );
}

export default KonvaRenderer;
