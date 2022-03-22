import { motion } from "framer-motion";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
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
  console.log(errors);

  const onValid = ({ createBoard }: IForm) => {
    setToDos((allBoards) => {
      const newBoard = { ...allBoards, [createBoard]: [] };
      return newBoard;
    });
    setValue("createBoard", "");
  };

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

  const myVars = {
    start: { opacity: 0 },
    end: {
      opacity: 1,
    },
  };

  const boxVariants = {
    start: {
      opacity: 0,
      scale: 0.5,
    },
    end: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.5,
        staggerChildren: 0.3,
      },
    },
  };
  const Boards = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
  `;

  const Box = styled(motion.div)``;

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
          <Boards variants={boxVariants} initial="start" animate="end">
            {Object.keys(toDos).map((boardId, index) => (
              <Box key={index} variants={myVars}>
                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
              </Box>
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
