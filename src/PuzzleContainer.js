import React from 'react';

function PuzzleContainer({children, puzzleSolved, gridSize, sizeY}) {
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
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </div>
  )
}

export default PuzzleContainer;
