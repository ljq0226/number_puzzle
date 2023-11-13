export function shuffleMatrix(n: number): number[][] {
  const length = n * n;
  const array = Array.from({ length }, (_, index) => index);

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  const matrix: number[][] = [];
  let index = 0;

  for (let i = 0; i < n; i++) {
    const row: number[] = [];

    for (let j = 0; j < n; j++) {
      row.push(array[index]);
      index++;
    }

    matrix.push(row);
  }

  return matrix;
}
export function compareAdjacentCoordinates(coord1: [number, number], coord2: [number, number]): string {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  if (x2 === x1 && y2 === y1 - 1) {
    return "l";
  } else if (x2 === x1 && y2 === y1 + 1) {
    return "r";
  } else if (x2 === x1 - 1 && y2 === y1) {
    return "t";
  } else if (x2 === x1 + 1 && y2 === y1) {
    return "b";
  } else {
    return "";
  }
}

export function findZeroCoordinates(matrix: number[][]): [number, number] {
  const size = matrix.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 0) {
        return [i, j];
      }
    }
  }

  return [0,0];
}
