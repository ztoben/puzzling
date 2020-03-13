import React from 'react';
import {ReactComponent as Logo} from './svgs/logo.svg';
import {unshufflePuzzle} from './helpers/puzzle';
import {getButtonStyle} from './styles';

function resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY, puzzleGrid) {
  setPuzzleSolved(false);
  setPuzzleGrid(unshufflePuzzle(puzzleGrid));
}

function clearGame(setPuzzleGrid, setPuzzleSolved, setPuzzleImage) {
  setPuzzleGrid(undefined);
  setPuzzleImage(undefined);
  setPuzzleSolved(false);
}

const headerStyle = {
  flexGrow: 1,
  fontSize: '40px',
  margin: '0 0 0 10px'
};

function PuzzleContainer({
  children,
  puzzleSolved,
  gridSize,
  sizeY,
  sizeX,
  setPuzzleGrid,
  setPuzzleSolved,
  puzzleGrid,
}) {
  return (
    <>
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
              css={getButtonStyle('orange')}
              onClick={() => resetGame(setPuzzleGrid, setPuzzleSolved, sizeX, sizeY, puzzleGrid)}
            >
              Reset
            </button>
            <button
              css={{...getButtonStyle('red'), marginLeft: 10}}
              onClick={() => clearGame(setPuzzleGrid, setPuzzleSolved, setPuzzleGrid)}
            >
              Clear
            </button>
          </>
        )}
      </div>
      <div
        css={{
          transition: 'transform 2s',
          transformStyle: 'preserve-3d',
          transform: puzzleSolved && 'rotateY(180deg)',
          width: '100%',
          height: puzzleGrid ? `${gridSize * sizeY}px` : '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: puzzleGrid ? 0 : 50
        }}
      >
        {children}
      </div>
    </>
  )
}

export default PuzzleContainer;
