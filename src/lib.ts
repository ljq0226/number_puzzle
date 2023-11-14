export function shuffleMatrix(n: number): { newMatrix: number[][], operateMatrix: number[][], successMatrix: number[][] } {
  const length = n * n;
  const array = Array.from({ length }, (_, index) => index);

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  const newMatrix: number[][] = [];
  const operateMatrix: number[][] = [];
  const successMatrix: number[][] = [];
  let index = 0;

  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    const operateRow: number[] = [];
    const successRow: number[] = [];

    for (let j = 0; j < n; j++) {
      row.push(array[index]);
      operateRow.push(array[index]);
      successRow.push(index === length - 1 ? 0 : index + 1);
      index++;
    }

    newMatrix.push(row);
    operateMatrix.push(operateRow);
    successMatrix.push(successRow);
  }

  return { newMatrix, operateMatrix, successMatrix };
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

export function areArraysEqual<T>(arr1: T[][], arr2: T[][]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length !== arr2[i].length) {
      return false;
    }

    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  return true;
}
