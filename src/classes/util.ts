// TODO: split util.ts into multiple files

export type Color = [number, number, number];

export type Point = {
  x: number;
  y: number;
};

class ColorPalette {
  private colors: string[];

  constructor(...colors: string[]) {
    this.colors = colors;
  }

  // Add a color to the palette and return its index
  addColor(color: string): number {
    const colorIndex = this.colors.length;
    this.colors.push(color);
    return colorIndex;
  }

  // Get the color corresponding to a given index
  getColor(index: number): string {
    if (index < 0 || index >= this.colors.length) {
      throw new Error('Invalid color index');
    }
    return this.colors[index];
  }

  // Get the number of colors in the palette
  getColorCount(): number {
    return this.colors.length;
  }
}

class Matrix {
  private data: number[];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = new Array(width * height).fill(0); // Initialize with color index 0 (e.g., white)
  }

  // Get the color index at a specific position (x, y)
  get(x: number, y: number): number {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error('Invalid coordinates');
    }
    return this.data[y * this.width + x];
  }

  // Set the color index at a specific position (x, y)
  set(x: number, y: number, colorIndex: number): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error('Invalid coordinates');
    }
    this.data[y * this.width + x] = colorIndex;
  }

  // Clear the entire canvas to a specific color index (e.g., clear to white)
  clear(colorIndex: number): void {
    this.data.fill(colorIndex);
  }

  // Return a copy of the canvas data
  getData(): number[] {
    return [...this.data];
  }

  getPoint(index: number): Point {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return {x, y};
  }

  map<T>(callback: (colorIndex: number, point: Point) => T): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.data.length; i++) {
      const point = this.getPoint(i);
      result.push(callback(this.data[i], point));
    }
    return result;
  }

  forEach(callback: (colorIndex: number, point: Point) => void): void {
    for (let i = 0; i < this.data.length; i++) {
      const point = this.getPoint(i);
      callback(this.data[i], point);
    }
  }
}

export {ColorPalette, Matrix};