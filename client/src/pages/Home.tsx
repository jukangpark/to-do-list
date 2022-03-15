import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Home = () => {
  const onDragEnd = () => {};
  return (
    <div>
      Home
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(magic) => (
                    <li
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      {...magic.dragHandleProps}
                    >
                      ToDo1
                    </li>
                  )}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {(magic) => (
                    <li
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      {...magic.dragHandleProps}
                    >
                      ToDo2
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
