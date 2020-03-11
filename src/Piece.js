import React from 'react';
import {ItemTypes} from './constants';
import {useDrag, useDrop} from 'react-dnd';
import {isTouchDevice} from './helpers/isTouchDevice';
import Preview from 'react-dnd-preview';

function determineBackgroundColor(isDragging, isOver) {
  if (isDragging) return 'yellow';
  if (isOver) return 'green';

  return 'black';
}

function centerTransformStyles(style, gridSize) {
  const parenRegExp = /\(([^)]+)\)/;
  const {transform} = style;
  const [, currentOffsets] = parenRegExp.exec(transform);
  const [offsetX, offsetY] = currentOffsets.split(', ');
  const newOffsetY = parseFloat(offsetY.slice(0, -2)) - gridSize / 2;
  const newTransform = `translate(${offsetX}, ${newOffsetY}px)`;

  return {
    ...style,
    transform: newTransform,
    WebkitTransform: newTransform
  }
}

const generatePreview = ({item: {image, content, gridSize}, style}) => {
  return (
    <div style={centerTransformStyles(style, gridSize)}>
      <img src={image} alt={content} width={gridSize} height={gridSize}/>
    </div>
  );
};

function Piece({x, y, content, image, onDrop, gridSize}) {
  const [{isDragging, item}, drag] = useDrag({
    item: {
      type: ItemTypes.PUZZLE_PIECE,
      dragPosition: {x, y},
      gridSize,
      image,
      content
      },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem()
    }),
  });
  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.PUZZLE_PIECE,
    drop: () => {
      const {dragPosition} = item;

      onDrop(dragPosition.x, dragPosition.y);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  function attachRef(el) {
    drag(el);
    drop(el);
  }

  return (
    <>
      {isTouchDevice && <Preview>{generatePreview}</Preview>}
      <div
        ref={attachRef}
        style={{
          backgroundColor: determineBackgroundColor(isDragging, isOver),
          opacity: isOver ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          margin: -1
        }}
      >
        <img src={image} alt={content} width={gridSize} height={gridSize}/>
      </div>
    </>
  )
}

export default Piece;
