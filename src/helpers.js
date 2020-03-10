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
    shuffledPuzzle.push(shuffledFlatPuzzle.slice(i * y, i * y + y).map((content, j) => {
      return {...content, shuffledPosition: {x: i, y: j}}
    }));
  }

  return shuffledPuzzle;
}

export function makePuzzleGrid(w, h, image, gridSize) {
  let array = [];

  for (let x = 0; x < h; x++) {
    array[x] = [];
    for (let y = 0; y < w; y++) {
      let canvas = document.createElement('canvas');

      canvas.width = gridSize;
      canvas.height = gridSize;

      let context = canvas.getContext('2d');

      context.drawImage(
        image,
        y * gridSize,
        x * gridSize,
        gridSize,
        gridSize,
        0,
        0,
        canvas.width,
        canvas.height
      );

      array[x][y] = {
        solvedPosition: {x, y},
        content: [x, y].toString(),
        image: canvas.toDataURL()
      };
    }
  }

  return shufflePuzzle(array);
}

export function unshufflePuzzle(puzzle) {
  const unshuffledPuzzle = [];
  const width = puzzle.length;
  const height = puzzle[0].length;

  let unshuffledFlatPuzzle = [...puzzle.flat()].sort((a, b) => {
    const {shuffledPosition: {x: aX, y: aY}} = a;
    const {shuffledPosition: {x: bX, y: bY}} = b;

    const aPosition = aY + aX * width;
    const bPosition = bY + bX * width;

    return aPosition - bPosition;
  });

  for (let i = 0; i < width; i++) {
    unshuffledPuzzle.push(unshuffledFlatPuzzle.slice(i * height, i * height + height));
  }

  return unshuffledPuzzle;
}
