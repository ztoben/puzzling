import React from 'react';
import {ReactComponent as Upload} from './svgs/upload.svg';
import {makePuzzleGrid} from './helpers/puzzle';
import {MAX_GRID_SIZE, MIN_GRID_SIZE} from './constants';
import {getButtonStyle} from './styles';

function buildNewGame(setPuzzleGrid, setPuzzleSolved, setResizedImage, sizeX, sizeY, puzzleImage, gridSize) {
  const imageToResize = new Image();
  const image = new Image();
  const reader = new FileReader();
  const outputImageAspectRatio = sizeX / sizeY;

  reader.addEventListener("load", function () {
    imageToResize.src = reader.result;
    imageToResize.onload = () => {
      // https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
      const inputWidth = imageToResize.naturalWidth;
      const inputHeight = imageToResize.naturalHeight;

      const imageToResizeAspectRatio = inputWidth / inputHeight;

      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (imageToResizeAspectRatio > outputImageAspectRatio) {
        outputWidth = inputHeight * outputImageAspectRatio;
      } else if (imageToResizeAspectRatio < outputImageAspectRatio) {
        outputHeight = inputWidth / outputImageAspectRatio;
      }

      const outputX = (outputWidth - inputWidth) * .5;
      const outputY = (outputHeight - inputHeight) * .5;

      const canvas = document.createElement('canvas');

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const context = canvas.getContext('2d');

      context.drawImage(imageToResize, outputX, outputY);

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

  if (newValue >= MIN_GRID_SIZE && newValue <= MAX_GRID_SIZE) {
    setSize(newValue);
  }
}

const incrementSizeContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  minWidth: '250px'
};

function NewGame({
  setPuzzleImage,
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
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      backfaceVisibility: 'hidden',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      padding: 50
    }}>
      <label
        css={{
          ...getButtonStyle('darkturquoise'),
          height: 'inherit',
          marginBottom: 10
        }}
      >
        {!puzzleImage && <Upload width={18} height={18} css={{marginRight: 10}}/>}
        {!puzzleImage ? 'Choose a picture...' : puzzleImage.name}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={(event) => setPuzzleImage(event.target.files[0])}
          css={{
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1,
            marginBottom: 10
          }}
        />
      </label>
      <div css={incrementSizeContainerStyle}>
        <button
          css={getButtonStyle('gray')}
          onClick={() => handleChangeSize(-1, sizeX, setSizeX)}
        >
          -
        </button>
        {`Columns: ${sizeX}`}
        <button
          css={getButtonStyle('gray')}
          onClick={() => handleChangeSize(1, sizeX, setSizeX)}
        >
          +
        </button>
      </div>
      <div css={incrementSizeContainerStyle}>
        <button
          css={getButtonStyle('gray')}
          onClick={() => handleChangeSize(-1, sizeY, setSizeY)}
        >
          -
        </button>
        {`Rows: ${sizeY}`}
        <button
          css={getButtonStyle('gray')}
          onClick={() => handleChangeSize(1, sizeY, setSizeY)}
        >
          +
        </button>
      </div>
      <button
        css={getButtonStyle('limegreen', !!puzzleImage)}
        onClick={() => buildNewGame(
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
