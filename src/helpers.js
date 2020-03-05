export function isPuzzleSolved(puzzle) {
  return puzzle.every((row, x) => row.every(({solvedPosition: {x: solvedX, y: solvedY}}, y) => {
    return x === solvedX && y === solvedY;
  }));
}

export function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function shufflePuzzle(puzzle) {
  let shuffledPuzzle = [];

  const x = puzzle.length;
  const y = puzzle[0].length;

  const shuffledFlatPuzzle = shuffleArray(puzzle.flat());

  for (let i = 0; i < x; i++) {
    shuffledPuzzle.push(shuffledFlatPuzzle.slice(i * y, i * y + y));
  }

  return shuffledPuzzle;
}

export function makePuzzleGrid(w, h) {
  let array = [];

  for (let x = 0; x < h; x++) {
    array[x] = [];
    for (let y = 0; y < w; y++) {
      array[x][y] = {solvedPosition: {x, y}, content: [x, y].toString()};
    }
  }

  return shufflePuzzle(array);
}
