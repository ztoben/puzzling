import React from 'react'
import {ItemTypes} from './constants'
import {useDrag, useDrop} from 'react-dnd'

function determineBackgroundColor(isDragging, isOver) {
  if (isDragging) return 'yellow';
  if (isOver) return 'green';

  return 'white';
}

function Piece({x, y, content, onDrop}) {
  const [{isDragging, item}, drag] = useDrag({
    item: {type: ItemTypes.PUZZLE_PIECE, dragPosition: {x, y}},
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
        border: '1px solid black'
      }}
    >
      {content}
    </div>
  )
}

export default Piece;
