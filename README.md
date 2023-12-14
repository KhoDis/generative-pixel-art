# Pixel Art Renderer

This project is a TypeScript-based pixel art renderer that allows you to create scenes using simple primitives.
It provides a set of builder functions to construct and organize elements in the renderer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/KhoDis/generative-pixel-art.git
cd generative-pixel-art
npm install
```

## Usage

To use the pixel art renderer, follow these steps:

1. Import the necessary functions and types:

   ```typescript
   import { blot, sprites, group, pixel } from "./src/renderer/builders";
   import blots from "./renderer/blots.ts";
   import sprites from "./renderer/sprites.ts";
   import { Point, Color, Group, Pixel } from "./src/renderer/types";
   ```

2. Create a scene using the provided builder functions:

   ```typescript
   const myScene: Group = group(
     [
       blots.rect(10, 5, { r: 255, g: 0, b: 0 }), // Red rectangle
       sprites.circle(8, { r: 0, g: 255, b: 0 }), // Green circle
       blots.line({ x: 5, y: 5 }, { x: 15, y: 15 }, { r: 0, g: 0, b: 255 }), // Blue line
     ],
     { x: 0, y: 0 },
   );
   ```

3. Render the scene using the renderer component:

   ```tsx
   import KonvaRenderer from "./components/KonvaRenderer.tsx";

   // ...

   return (
     <KonvaRenderer
       canvasWidth={50}
       canvasHeight={50}
       scale={2}
       scene={myScene}
     />
   );
   ```

4. Adjust parameters such as canvas dimensions, scale, and scene composition to customize the output.

## File Structure

The project follows the following file structure:

- `src/components/`: React components (currently only the renderer)
- `src/renderer/`: Core files for the pixel art renderer
  - `builders.ts`: Builder/helper functions for constructing elements
  - `blots.ts`: Functions for drawing primitives based on random points
  - `sprites.ts`: Functions for drawing primitives based on a grid of points
  - `types.ts`: Shared types used in the renderer
- `src/app/`: Application entry point and main components
- `public/`: Static assets

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or create a pull request.
