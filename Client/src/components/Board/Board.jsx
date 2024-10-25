import { useState } from 'react';
import Header from '../Header/Header';
import TaskBoards from '../TaskBoards/TaskBoards';
import Styles from './Board.module.css'

const Board = () => {
  const [selectedOption, setSelectedOption] = useState('thisWeek');
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    done: []
  });

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  }
  return (
    <>
      <div className={Styles.mainContent}>
        <Header
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
        />
        <TaskBoards tasks={tasks}/>
      </div>
    </>
  );
};

export default Board;
