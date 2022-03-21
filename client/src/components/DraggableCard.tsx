import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? props.theme.cardColor : props.theme.boardColor};
`;

const DragableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable index={index} draggableId={toDoId + ""}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);
