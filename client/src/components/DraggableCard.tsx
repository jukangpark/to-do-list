import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: gray;
`;

const DragableCard = ({ toDo, index }: IDraggableCardProps) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragableCard);
