import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "../components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const Home = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // Delete item on source.index
        boardCopy.splice(source.index, 1);
        // Put back item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy }; //toDos 는 객체이기 때문에 객체 넣어줘야함.
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
      // cross board movement
    }
    //destination 이 없을 수도 있기 때문에 => 이유: 유저가 같은 자리에 둘 수도 있으니까.
  };

  //Array.prototype.splice();

  return (
    <div>
      Home
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <form>
            <input placeholder="create board" />
            <button>Create</button>
          </form>
        </div>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
};

export default Home;

// components 의 state 가 변하면
// 해당 component 의 모든 children 은 다시 렌더링 됩니다.
// parent 가 새로 고침 되면 children 도 모두 다 새로고침됨.
// 따라서 react memo 가 필요함.
