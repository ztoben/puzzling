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

function clearGame(setPuzzleGrid, setPuzzleSolved, setPuzzleImage) {
  setPuzzleGrid(undefined);
  setPuzzleImage(undefined);
  setPuzzleSolved(false);
}

function newGame(setPuzzleGrid, setPuzzleSolved, setResizedImage, sizeX, sizeY, puzzleImage, gridSize) {
  const imageToResize = new Image();
  const image = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    imageToResize.src = reader.result;
    imageToResize.onload = () => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = gridSize * sizeX;
      canvas.height = canvas.width * (imageToResize.height / imageToResize.width);
      ctx.drawImage(imageToResize, 0, 0, canvas.width, canvas.height);

      const resizedImageDataURL = canvas.toDataURL('image/png');

      image.src = resizedImageDataURL;
      image.onload = () => {
        setResizedImage(resizedImageDataURL);
        setPuzzleSolved(false);
        setPuzzleGrid(makePuzzleGrid(sizeX, sizeY, image, gridSize));
      }
    }
  }, false);

  reader.readAsDataURL(puzzleImage);
}

function getButtonStyle(color, enabled) {
  return {
    color: color,
    backgroundColor: 'white',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: 10,
    height: 48,
    textTransform: 'uppercase',
    outline: 'none',
    ...enabled && {
      '&:hover': {
        backgroundColor: color,
        color: 'white',
        cursor: 'pointer'
      }
    },
    ...!enabled && {
      '&:hover': {
        cursor: 'not-allowed',
        backgroundColor: 'lightgray'
      }
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
  const sizeX = 4;
  const sizeY = 4;

  const [puzzleImage, setPuzzleImage] = useState(undefined);
  const [resizedImage, setResizedImage] = useState(undefined);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [puzzleGrid, setPuzzleGrid] = useState(undefined);
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
            width: `${gridSize * sizeX}px`,
            alignItems: 'center',
            padding: 10
          }}
        >
          <Logo width={40} height={40}/>
          <h1 css={headerStyle}>Puzzling</h1>
          {puzzleGrid && (
            <>
              <button
                css={getButtonStyle('orange', true)}
                onClick={() => resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY, puzzleGrid)}
              >
                Reset
              </button>
              <button
                css={{...getButtonStyle('red', true), marginLeft: 10}}
                onClick={() => clearGame(setPuzzleGrid, setPuzzleSolved, setPuzzleGrid)}
              >
                Clear
              </button>
            </>
          )}
        </div>
        <PuzzleContainer
          puzzleSolved={puzzleSolved}
          gridSize={gridSize}
          sizeY={sizeY}
        >
          {!puzzleGrid && (
            <div css={{display: 'flex', flexDirection: 'column'}}>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setPuzzleImage(event.target.files[0])}
                css={{marginBottom: 10}}
              />
              <button
                css={getButtonStyle('green', puzzleImage)}
                onClick={() => newGame(setPuzzleGrid, setPuzzleSolved, setResizedImage, sizeX, sizeY, puzzleImage, gridSize)}
                disabled={!puzzleImage}
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
              resizedImage={resizedImage}
            />
          )}
        </PuzzleContainer>
      </div>
    </DndProvider>
  );
}

export default App;
