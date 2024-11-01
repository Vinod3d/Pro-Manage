import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import TaskBoards from '../TaskBoards/TaskBoards';
import Styles from './Board.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessage, getTask } from '../../store/slices/taskSlice';

const Board = () => {
  const [selectedOption, setSelectedOption] = useState('thisWeek');
  const dispatch = useDispatch();
  const {tasks, error, message} = useSelector((state)=>state.task);

  useEffect(()=>{
    if(message){
      clearMessage()
    }
    if(error){
      clearErrors()
    }

    dispatch(getTask(selectedOption));
  },[dispatch, error, message, selectedOption])

  const handleSelectDate = (option) => {
    setSelectedOption(option);
  }


  return (
    <>
      <div className={Styles.mainContent}>
        <Header
          selectedOption={selectedOption}
          handleSelectDate={handleSelectDate}
        />
        <TaskBoards 
          tasks={tasks?.tasks}
        />
      </div>
    </>
  );
};

export default Board;
