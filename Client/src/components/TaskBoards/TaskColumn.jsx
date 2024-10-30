/* eslint-disable react/prop-types */
import StylesTaskColumn from './TaskColumn.module.css'; // Import the styles for TaskColumn
import { collaps } from '../../assets/Index';
import { FaPlus } from "react-icons/fa6";
import TaskCard from './TaskCard';
import { VscCollapseAll } from "react-icons/vsc";
import { useState } from 'react';

const TaskColumn = ({ title, tasks, onAddTask }) => {
    const [collapsedAll, setCollapsedAll] = useState(false); // Track if the column should be collapsed
    const handleCollapseAll = () => {
        setCollapsedAll(true); // Toggle the collapsed state
    };
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
                        alt='Toggle' 
                        onClick={()=>handleCollapseAll()} 
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
                        />

                    ))}
                </div>
        
        </div>
    );
};

export default TaskColumn;
