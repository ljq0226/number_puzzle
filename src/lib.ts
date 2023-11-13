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
