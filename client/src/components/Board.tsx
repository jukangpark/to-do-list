import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.theme.boardColor};
  transition-duration: 400ms;
  min-height: 300px;
`;

interface IForm {
  toDo: string;
}

const Input = styled.input`
  width: 80%;
  margin: 0 auto;
  height: 20px;
  display: block;
`;

const Board = ({ toDos, boardId }: IBoardProps) => {
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = async ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    await setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });

    // onValid 밖에서 해야할 수도있을듯?
    // console.log(ToDos);

    setValue("toDo", "");
  };

  const fetchFunc = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ["To Do"]: ToDos["To Do"],
        Doing: ToDos.Doing,
        Done: ToDos.Done,
      }),
    });
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={boardId}
        />
        <button style={{ backgroundColor: "red" }} onClick={() => fetchFunc()}>
          할일 저장
        </button>
      </form>

      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
