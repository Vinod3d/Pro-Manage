import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import TaskBoards from '../TaskBoards/TaskBoards';
import Styles from './Board.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getTask } from '../../store/slices/taskSlice';
import { toast } from 'react-toastify';

const Board = () => {
  const [selectedOption, setSelectedOption] = useState('thisWeek');
  const dispatch = useDispatch();
  const {tasks, error} = useSelector((state)=>state.task);
  
  useEffect(()=>{
    dispatch(clearErrors())
    if(error){
      toast.error(error)
    }

    dispatch(getTask(selectedOption));
  },[dispatch, selectedOption, error])

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
        <TaskBoards tasks={tasks?.tasks}/>
      </div>
    </>
  );
};

export default Board;
