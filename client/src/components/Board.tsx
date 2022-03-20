import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

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
  background-color: whitesmoke;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "black"
      : props.isDraggingFromThis
      ? "#666666"
      : "whitesmoke"};
  transition-duration: 400ms;
  min-height: 300px;
`;

interface IProps {
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor={boardId}>{boardId}</label>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={boardId}
        />
        <button>submit</button>
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
