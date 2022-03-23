import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { atomFamily, useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "../components/Board";
import { Form, Input } from "../components/FormComponents";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 100px auto;
  justify-content: center;
  align-items: center;
`;

const CreateBoard = styled.div`
  margin-top: 100px;
`;

interface IForm {
  createBoard: string;
}

const Home = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = ({ createBoard }: IForm) => {
    setToDos((allBoards) => {
      const newBoard = { ...allBoards, [createBoard]: [] };
      return newBoard;
    });
    setValue("createBoard", "");
  };

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "DB 에 해당 유저의 todos가 없습니다") {
          return;
        }
        const downloadedtoDos = {
          "To Do": data["To Do"],
          Doing: data.Doing,
          Done: data.Done,
        };
        setToDos(downloadedtoDos);
      });
  }, []);

  // Board 라는 함수형 컴포넌트가 애초에 3번씩 호출되고 있었음.
  // 따라서 Board 컴포넌트안에서 api 호출하게 되면 안됨

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
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
      // cross board movement
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
    }

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        "To Do": toDos["To Do"],
        Doing: toDos.Doing,
        Done: toDos.Done,
      }),
      // 왜 도대체 전역 State 는 여기서 적용 바로 되지 않는거임????
      // 드래그를 두번 해야 그전의 State 만 DB에 저장되네..
      // 이유가 뭔가요.. 제발..
    });

    //destination 이 없을 수도 있기 때문에 => 이유: 유저가 같은 자리에 둘 수도 있으니까.
  };

  const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  `;

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <CreateBoard>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("createBoard", {
                required: "board 이름을 작성해주세요",
              })}
              placeholder="create board"
            />

            <span>{errors?.createBoard?.message}</span>
          </Form>
        </CreateBoard>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId, index) => (
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
