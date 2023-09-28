import {Stage, Layer, Rect} from 'react-konva';

type CanvasContext = {
  canvasSize: number;
  pixelSize: number;
};

type PixelPopulationRule = (context: CanvasContext, x: number, y: number) => string;

const generateRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16);

const populateCanvas = (context: CanvasContext, rule: PixelPopulationRule) => {
  const {canvasSize, pixelSize} = context;
  const pixelArtGrid = [];

  for (let x = 0; x < canvasSize; x++) {
    for (let y = 0; y < canvasSize; y++) {
      const color = rule(context, x, y);
      pixelArtGrid.push(
        <Rect
          key={`pixel-${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      );
    }
  }

  return pixelArtGrid;
};

const randomPixelsRule: PixelPopulationRule = () => generateRandomColor();

const circleRule: PixelPopulationRule = (context, x, y) => {
  const centerX = Math.floor(context.canvasSize / 2);
  const centerY = Math.floor(context.canvasSize / 2);
  const circleRadius = 3;

  const distanceToCenter = Math.sqrt(
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
  );

  return distanceToCenter <= circleRadius ? 'black' : 'white';
};

function PixelArtRenderer() {
  const canvasContext: CanvasContext = {
    canvasSize: 16,
    pixelSize: 20,
  };

  const modes = {
    randomPixels: randomPixelsRule,
    circle: circleRule,
  }

  const pixelArtGrid = populateCanvas(canvasContext, modes.circle);

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
