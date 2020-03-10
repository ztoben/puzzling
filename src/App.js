import React, {useState} from 'react';
import {useWindowSize} from '@react-hook/window-size';
import {DndProvider} from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import {isPuzzleSolved, makePuzzleGrid, unshufflePuzzle} from './helpers';
import {ReactComponent as Logo} from './logo.svg';
import Puzzle from './Puzzle';
import PuzzleContainer from './PuzzleContainer';

function swapPieces(puzzleGrid, setPuzzleGrid, setPuzzleSolved, dropX, dropY, dragX, dragY) {
  const newPuzzleGrid = JSON.parse(JSON.stringify(puzzleGrid));
  const dragPiece = newPuzzleGrid[dragX][dragY];
  const dropPiece = newPuzzleGrid[dropX][dropY];

  newPuzzleGrid[dragX][dragY] = dropPiece;
  newPuzzleGrid[dropX][dropY] = dragPiece;

  setPuzzleGrid(newPuzzleGrid);

  setPuzzleSolved(isPuzzleSolved(newPuzzleGrid));
}

function resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY, puzzleGrid) {
  setPuzzleSolved(false);
  setPuzzleGrid(unshufflePuzzle(puzzleGrid));
}

function newGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY) {
  setPuzzleSolved(false);
  setPuzzleGrid(makePuzzleGrid(sizeX, sizeY));
}

function getButtonStyle(color) {
  return {
    color: color,
    backgroundColor: 'white',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: 10,
    height: 48,
    textTransform: 'uppercase',
    outline: 'none',
    '&:hover': {
      backgroundColor: color,
      color: 'white',
      cursor: 'pointer'
    }
  }
}

const appContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const headerStyle = {
  flexGrow: 1,
  fontSize: '40px',
  margin: '0 0 0 10px'
};

function App() {
  const sizeX = 3;
  const sizeY = 3;
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleGrid, setPuzzleGrid] = useState();
  const [width, height] = useWindowSize();
  const gridSize = width < height
    ? width * .8 / sizeX
    : height * .8 / sizeY;

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div css={appContainerStyle}>
        <div
          css={{
            display: 'inline-flex',
            maxWidth: 500,
            width: '80%',
            alignItems: 'center',
            padding: 10
          }}
        >
          <Logo width={40} height={40}/>
          <h1 css={headerStyle}>Puzzling</h1>
          {puzzleGrid && (
            <button
              css={getButtonStyle('orange')}
              onClick={() => resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY, puzzleGrid)}
            >
              Reset
            </button>
          )}
        </div>
        <PuzzleContainer
          puzzleSolved={puzzleSolved}
          gridSize={gridSize}
          sizeY={sizeY}
        >
          {!puzzleGrid && (
            <div>
              <button
                css={getButtonStyle('green')}
                onClick={() => newGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY)}
              >
                New Game
              </button>
            </div>
          )}
          {puzzleGrid && (
            <Puzzle
              gridSize={gridSize}
              sizeX={sizeX}
              sizeY={sizeY}
              puzzleSolved={puzzleSolved}
              puzzleGrid={puzzleGrid}
              setPuzzleSolved={setPuzzleSolved}
              setPuzzleGrid={setPuzzleGrid}
              swapPieces={swapPieces}
            />
          )}
        </PuzzleContainer>
      </div>
    </DndProvider>
  );
}

export default App;
