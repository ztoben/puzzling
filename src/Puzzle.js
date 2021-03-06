import React from 'react';
import Piece from './Piece';
import {isPuzzleSolved} from './helpers/puzzle';

function swapPieces(puzzleGrid, setPuzzleGrid, setPuzzleSolved, dropX, dropY, dragX, dragY) {
  const newPuzzleGrid = JSON.parse(JSON.stringify(puzzleGrid));
  const dragPiece = newPuzzleGrid[dragX][dragY];
  const dropPiece = newPuzzleGrid[dropX][dropY];

  newPuzzleGrid[dragX][dragY] = dropPiece;
  newPuzzleGrid[dropX][dropY] = dragPiece;

  setPuzzleGrid(newPuzzleGrid);

  setPuzzleSolved(isPuzzleSolved(newPuzzleGrid));
}

function Puzzle({
  puzzleGrid,
  puzzleSolved,
  setPuzzleGrid,
  setPuzzleSolved,
  gridSize,
  sizeX,
  sizeY,
  resizedImage
}) {
  return (
    <>
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
        {puzzleGrid.map((rows, x) => rows.map(({content, image}, y) => {
          return (
            <Piece
              x={x}
              y={y}
              content={content}
              image={image}
              onDrop={(dragX, dragY) => swapPieces(puzzleGrid, setPuzzleGrid, setPuzzleSolved, x, y, dragX, dragY)}
              key={x + y}
              gridSize={gridSize}
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
          <img src={resizedImage} alt="solvedImage" width={gridSize * sizeX} height={gridSize * sizeY}/>
        </div>
      )}
    </>
  );
}

export default Puzzle;
