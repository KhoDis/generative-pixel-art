import {Layer, Rect, Stage} from 'react-konva';
import {ColorPalette, Matrix} from "../classes/util.ts";
import {useRef} from "react";

type CanvasContext = {
  canvasSize: number;
  pixelSize: number;
};

const palette = new ColorPalette('#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000');

const canvasContext: CanvasContext = {
  canvasSize: 16,
  pixelSize: 20,
};

function PixelArtRenderer() {
  const canvasRef = useRef(new Matrix(canvasContext.canvasSize, canvasContext.canvasSize));

  const drawRect = (x: number, y: number, width: number, height: number, colorIndex: number) => {
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        canvasRef.current.set(i, j, colorIndex);
      }
    }
  };

  drawRect(0, 0, 15, 15, 0);

  drawRect(0, 0, 15, 15, 1);
  drawRect(0, 0, 15, 15, 2);
  drawRect(1, 1, 13, 13, 3);

  const pixelArtGrid = canvasRef.current.map((colorIndex, point) => {
    const {x, y} = point

    return (
      <Rect
        key={`pixel-${x}-${y}`}
        x={x * canvasContext.pixelSize}
        y={y * canvasContext.pixelSize}
        width={canvasContext.pixelSize * canvasContext.canvasSize}
        height={canvasContext.pixelSize * canvasContext.canvasSize}
        fill={palette.getColor(colorIndex)}
      />
    );
  });

  return (
    <Stage width={canvasContext.canvasSize * canvasContext.pixelSize}
           height={canvasContext.canvasSize * canvasContext.pixelSize}>
      <Layer>
        {pixelArtGrid}
      </Layer>
    </Stage>
  );
}

export default PixelArtRenderer;
