import React, {useState} from 'react';
import {useWindowSize} from '@react-hook/window-size';
import {DndProvider} from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import PuzzleContainer from './PuzzleContainer';
import NewGame from './NewGame';
import Puzzle from './Puzzle';

function getButtonStyle(color, enabled) {
  return {
    color: color,
    backgroundColor: 'white',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: 10,
    height: 48,
    minWidth: 48,
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

function App() {
  const [sizeX, setSizeX] = useState(4);
  const [sizeY, setSizeY] = useState(4);

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
        <PuzzleContainer
          puzzleSolved={puzzleSolved}
          gridSize={gridSize}
          sizeY={sizeY}
          sizeX={sizeX}
          setPuzzleGrid={setPuzzleGrid}
          setPuzzleSolved={setPuzzleSolved}
          puzzleGrid={puzzleGrid}
          getButtonStyle={getButtonStyle}
        >
          {puzzleGrid ? (
            <Puzzle
              gridSize={gridSize}
              sizeX={sizeX}
              sizeY={sizeY}
              puzzleSolved={puzzleSolved}
              puzzleGrid={puzzleGrid}
              setPuzzleSolved={setPuzzleSolved}
              setPuzzleGrid={setPuzzleGrid}
              resizedImage={resizedImage}
            />
          ) : (
            <NewGame
              setPuzzleImage={setPuzzleImage}
              getButtonStyle={getButtonStyle}
              sizeX={sizeX}
              setSizeX={setSizeX}
              sizeY={sizeY}
              setSizeY={setSizeY}
              puzzleImage={puzzleImage}
              setPuzzleGrid={setPuzzleGrid}
              setPuzzleSolved={setPuzzleSolved}
              setResizedImage={setResizedImage}
              gridSize={gridSize}
            />
          )}
        </PuzzleContainer>
      </div>
    </DndProvider>
  );
}

export default App;
