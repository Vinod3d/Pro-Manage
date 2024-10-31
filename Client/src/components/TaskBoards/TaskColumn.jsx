/* eslint-disable react/prop-types */
import StylesTaskColumn from "./TaskColumn.module.css";
import { collaps } from "../../assets/Index";
import { FaPlus } from "react-icons/fa6";
import TaskCard from "./TaskCard";
import { VscCollapseAll } from "react-icons/vsc";
import { useState } from "react";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import OkModal from "../okModal/okModal";

const TaskColumn = ({ title, tasks, onAddTask }) => {
    const [collapsedAll, setCollapsedAll] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [isOkModalOpen, setIsOkModalOpen] = useState(false);

    const handleCollapseAll = () => {
        setCollapsedAll(true);
    };

    const handleEditTaskOpen = () => {
        setIsEditTaskModalOpen(true);
    };

    const handleEditTaskClose = () => {
        setIsEditTaskModalOpen(false);
    };

    const handleDeleteModalOpen = ()=>{
        setIsOkModalOpen(true);
    }

    const handleDelete = ()=>{

    }

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
