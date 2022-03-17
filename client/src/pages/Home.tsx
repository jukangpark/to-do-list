import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";
import DraggableCard from "../components/DraggableCard";

const Home = () => {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    //destination 이 없을 수도 있기 때문에 => 이유: 유저가 같은 자리에 둘 수도 있으니까.
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // state 를 mutate 하지 않을 것입니다.
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      // insert draggableId에 있는 값을 destination.index 에서 index[0] 첫번째에 insert.
      console.log(toDosCopy);
      // 이 새로운 배열을 db에 저장? 순서를 바꾸니까 근데 기존의 값을 삭제하고 db에 다시 저장하는건 무리?
      return toDosCopy;
    });
  };

  //Array.prototype.splice();

  return (
    <div>
      Home
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(magic) => (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} toDo={toDo} index={index} />
                ))}
                {magic.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;

// components 의 state 가 변하면
// 해당 component 의 모든 children 은 다시 렌더링 됩니다.
// parent 가 새로 고침 되면 children 도 모두 다 새로고침됨.
// 따라서 react memo 가 필요함.
