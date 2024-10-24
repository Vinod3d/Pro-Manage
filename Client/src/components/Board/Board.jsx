import { useState } from 'react';
import Header from '../Header/Header';
import TaskBoards from '../TaskBoards/TaskBoards';
import Styles from './Board.module.css'

const Board = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    done: []
});
  return (
    <>
      <div className={Styles.mainContent}>
        <Header/>
        <TaskBoards tasks={tasks}/>
      </div>
    </>
  );
};

export default Board;
