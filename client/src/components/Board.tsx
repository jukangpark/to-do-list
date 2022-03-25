import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { toDoState } from "../atoms";
import { IToDo } from "../atoms";

import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

  // const onValid = ({ toDo }: IForm) => {
  //   const newToDo = {
  //     id: Date.now(),
  //     text: toDo,
  //   };

  //   setToDos((allBoards) => {
  //     return {
  //       ...allBoards,
  //       [boardId]: [newToDo, ...allBoards[boardId]],
  //     };
  //   });

  //   console.log(ToDos);

  //   // onValid 밖에서 해야할 수도있을듯?
  //   fetch("/api/todos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //     body: JSON.stringify({
  //       ["To Do"]: ToDos["To Do"],
  //       Doing: ToDos.Doing,
  //       Done: ToDos.Done,
  //     }),
  //   });

  //   setValue("toDo", "");
  // };

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    console.log(toDo);

    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });

    console.log(ToDos);

    // onValid 밖에서 해야할 수도있을듯?
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...ToDos,
        [boardId]: [newToDo, ...ToDos[boardId]],
        // ["To Do"]: ToDos["To Do"],
        // Doing: ToDos.Doing,
        // Done: ToDos.Done,
      }),
    });

    setValue("toDo", "");
  };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(ToDos);
  //   console.log("hello");
  // };

  // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   console.log(event.currentTarget.value);
  //   console.log(ToDos);
  // };

  return (
    <Wrapper>
      <Title>{boardId}</Title>

      <form onSubmit={handleSubmit(onValid)}>
        <Input
          type="text"
          placeholder={boardId}
          {...register("toDo", { required: true })}
        />
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
