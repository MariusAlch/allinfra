import parse from "csv-parse/lib/sync";
import fs from "fs";

export type Position = [number, number];
export interface CofeeShop {
  name: string;
  position: Position;
}

export function createPosition(xString: string, yString: string): Position {
  const x = Number(xString);
  const y = Number(yString);
  if (isNaN(x) || isNaN(y)) {
    throw new Error(`Invalid position input - ${xString},${yString}`);
  }
  return [x, y];
}

export function getDistance([x1, y1]: Position, [x2, y2]: Position) {
  const y = x2 - x1;
  const x = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function parseCoffeeShops(csvPath: string): CofeeShop[] {
  const csvBuffer = fs.readFileSync(csvPath);
  const records = parse(csvBuffer) as [string, string, string][];

  return records.map(([name, xString, yString], index) => {
    const position = createPosition(xString, yString);
    return { name, position };
  });
}
