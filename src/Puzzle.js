import React from 'react';
import Piece from './Piece';
import {useWindowSize} from '@react-hook/window-size';

function Puzzle({
  puzzleGrid,
  puzzleSolved,
  setPuzzleGrid,
  setPuzzleSolved,
  swapPieces,
  sizeX,
  sizeY
}) {
  const [width, height] = useWindowSize();
  const gridSize = width < height
    ? width * .8 / sizeX
    : height * .8 / sizeY;

  return (
    <div
      css={{
        transition: 'transform 2s',
        transformStyle: 'preserve-3d',
        transform: puzzleSolved && 'rotateY(180deg)',
        width: '100%',
        height: `${gridSize * sizeY}px`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: `repeat(${sizeX}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${sizeY}, ${gridSize}px)`,
          border: '1px solid black',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          backfaceVisibility: 'hidden',
          position: 'absolute'
        }}
      >
        {puzzleGrid.map((rows, x) => rows.map(({content}, y) => {
          return (
            <Piece
              x={x}
              y={y}
              content={content}
              onDrop={(dragX, dragY) => swapPieces(puzzleGrid, setPuzzleGrid, setPuzzleSolved, x, y, dragX, dragY)}
              key={x + y}
            />
          )
        }))}
      </div>
      {puzzleSolved && (
        <div
          css={{
            width: `${gridSize * sizeX}px`,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            position: 'absolute'
          }}
        >
          <h1>You Win!!</h1>
        </div>
      )}
    </div>
  );
}

export default Puzzle;
