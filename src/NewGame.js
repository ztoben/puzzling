import React from 'react';
import {makePuzzleGrid} from './helpers';

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

function handleChangeSize(changeBy, size, setSize) {
  const newValue = size + changeBy;

  if (newValue > 1 && newValue < 11) {
    setSize(newValue);
  }
}

const incrementSizeContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10
};

function NewGame({
  setPuzzleImage,
  getButtonStyle,
  sizeX,
  setSizeX,
  sizeY,
  setSizeY,
  puzzleImage,
  setPuzzleGrid,
  setPuzzleSolved,
  setResizedImage,
  gridSize
}) {
  return (
    <div css={{display: 'flex', flexDirection: 'column', backfaceVisibility: 'hidden'}}>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => setPuzzleImage(event.target.files[0])}
        css={{marginBottom: 10}}
      />
      <div css={incrementSizeContainerStyle}>
        <button
          css={getButtonStyle('gray', true)}
          onClick={() => handleChangeSize(-1, sizeX, setSizeX)}
        >
          -
        </button>
        {`Columns: ${sizeX}`}
        <button
          css={getButtonStyle('gray', true)}
          onClick={() => handleChangeSize(1, sizeX, setSizeX)}
        >
          +
        </button>
      </div>
      <div css={incrementSizeContainerStyle}>
        <button
          css={getButtonStyle('gray', true)}
          onClick={() => handleChangeSize(-1, sizeY, setSizeY)}
        >
          -
        </button>
        {`Rows: ${sizeY}`}
        <button
          css={getButtonStyle('gray', true)}
          onClick={() => handleChangeSize(1, sizeY, setSizeY)}
        >
          +
        </button>
      </div>
      <button
        css={getButtonStyle('green', puzzleImage)}
        onClick={() => newGame(
          setPuzzleGrid,
          setPuzzleSolved,
          setResizedImage,
          sizeX,
          sizeY,
          puzzleImage,
          gridSize
        )}
        disabled={!puzzleImage}
      >
        New Game
      </button>
    </div>
  );
}

export default NewGame;
