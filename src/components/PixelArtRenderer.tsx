import {Layer, Rect, Stage} from 'react-konva';

function generateRandomColor() {
  // Generate a random color in the format '#RRGGBB'
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function PixelArtRenderer() {
  // Define the size of the canvas and the size of each pixel
  const canvasSize = 16;
  const pixelSize = 20;

  // Create an empty grid for the pixel art
  const pixelArtGrid = [];

  // Populate the grid with random colors
  for (let x = 0; x < canvasSize; x++) {
    for (let y = 0; y < canvasSize; y++) {
      pixelArtGrid.push(
        <Rect
          key={`pixel-${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={generateRandomColor()}
        />
      );
    }
  }

  return (
    <Stage width={canvasSize * pixelSize} height={canvasSize * pixelSize}>
      <Layer>
        {pixelArtGrid}
      </Layer>
    </Stage>
  );
}

export default PixelArtRenderer;
