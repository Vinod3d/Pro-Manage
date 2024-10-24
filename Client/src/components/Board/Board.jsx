import Header from '../Header/Header';
import TaskBoards from '../TaskBoards/TaskBoards';
import Styles from './Board.module.css'

const Board = () => {

  return (
    <>
      <div className={Styles.mainContent}>
        <Header/>
        {/* <TaskBoard tasks={tasks} /> */}
        <TaskBoards/>
      </div>
    </>
  );
};

export default Board;
