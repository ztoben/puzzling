import React, {useState} from 'react';
import {DndProvider} from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import {isPuzzleSolved, makePuzzleGrid} from './helpers';
import Puzzle from './Puzzle';

function swapPieces(puzzleGrid, setPuzzleGrid, setPuzzleSolved, dropX, dropY, dragX, dragY) {
  const newPuzzleGrid = JSON.parse(JSON.stringify(puzzleGrid));
  const dragPiece = newPuzzleGrid[dragX][dragY];
  const dropPiece = newPuzzleGrid[dropX][dropY];

  newPuzzleGrid[dragX][dragY] = dropPiece;
  newPuzzleGrid[dropX][dropY] = dragPiece;

  setPuzzleGrid(newPuzzleGrid);

  setPuzzleSolved(isPuzzleSolved(newPuzzleGrid));
}

function resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY) {
  setPuzzleSolved(false);
  setPuzzleGrid(makePuzzleGrid(sizeX, sizeY));
}

const appContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const buttonStyle = {
  color: 'orange',
  backgroundColor: 'white',
  border: '2px solid orange',
  borderRadius: '10px',
  padding: 10,
  height: 48,
  textTransform: 'uppercase',
  outline: 'none',
  '&:hover': {
    backgroundColor: 'orange',
    color: 'white',
    cursor: 'pointer'
  }
};

function App() {
  const sizeX = 3;
  const sizeY = 3;
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleGrid, setPuzzleGrid] = useState(makePuzzleGrid(sizeX, sizeY));

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div css={appContainerStyle}>
        <div
          css={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            maxWidth: 500,
            width: '80%',
            alignItems: 'center'
          }}
        >
          <h1>Puzzling</h1>
          <button
            css={buttonStyle}
            onClick={() => resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY)}
          >
            Reset
          </button>
        </div>
        <Puzzle
          sizeX={sizeX}
          sizeY={sizeY}
          puzzleSolved={puzzleSolved}
          puzzleGrid={puzzleGrid}
          setPuzzleSolved={setPuzzleSolved}
          setPuzzleGrid={setPuzzleGrid}
          swapPieces={swapPieces}
        />
      </div>
    </DndProvider>
  );
}

export default App;
