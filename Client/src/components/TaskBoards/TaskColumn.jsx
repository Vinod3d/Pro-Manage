/* eslint-disable react/prop-types */
import StylesTaskColumn from "./TaskColumn.module.css";
import { collaps } from "../../assets/Index";
import { FaPlus } from "react-icons/fa6";
import TaskCard from "./TaskCard";
import { VscCollapseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import OkModal from "../okModal/OkModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/slices/taskSlice";
import { toast } from "react-toastify";
import { clearErrors, clearMessage } from "../../store/slices/userSlice";

const TaskColumn = ({ title, tasks, onAddTask }) => {
    const [collapsedAll, setCollapsedAll] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [isOkModalOpen, setIsOkModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const dispatch = useDispatch();
    const {message, error} = useSelector((state)=>state.task)

    const handleCollapseAll = () => {
        setCollapsedAll(true);
    };

    const handleEditTaskOpen = (task) => {
        setSelectedTask(task);
        setIsEditTaskModalOpen(true);
    };

    const handleEditTaskClose = () => {
        setIsEditTaskModalOpen(false);
    };

    const handleDeleteModalOpen = (taskId)=>{
      setSelectedTask(taskId);
      setIsOkModalOpen(true);
    }

    const handleDelete = ()=>{
      if (selectedTask) {
        dispatch(deleteTask(selectedTask));
        setIsOkModalOpen(false);
    }
    }

    useEffect(()=>{
      if(message){
        toast.success(message);
        clearMessage()
      }
      if (error) {
        toast.error(error)
        clearErrors()
      }
    },[error, message])

  return (
    <div className={StylesTaskColumn.column}>
      <div className={StylesTaskColumn.columnHeader}>
        <h3>{title}</h3>

        <div>
          {title === "To Do" && (
            <FaPlus
              onClick={onAddTask}
              className={StylesTaskColumn.addTaskIcon}
              title="Add Task"
            />
          )}

          <VscCollapseAll
            src={collaps}
            alt="Toggle"
            onClick={() => handleCollapseAll()}
            className={StylesTaskColumn.toggleIcon}
          />
        </div>
      </div>

      <div className={StylesTaskColumn.taskList}>
        {tasks?.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            isCollapsed={collapsedAll}
            setCollapsedAll={setCollapsedAll}
            onEdit={handleEditTaskOpen}
            onDelete={handleDeleteModalOpen}
          />
        ))}
      </div>

      <EditTaskModal
        task={selectedTask}
        isOpen={isEditTaskModalOpen}
        onClose={handleEditTaskClose}
      />

      <OkModal
        isOpen={isOkModalOpen}
        onClose={() => setIsOkModalOpen(false)}
        onOk={handleDelete}
        titleText={'Are you sure you want to Delete?'}
        btnText={' Yes, Delete'}  
      />
    </div>
  );
};

export default TaskColumn;
