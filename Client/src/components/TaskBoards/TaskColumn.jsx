import StylesTaskColumn from './TaskColumn.module.css'; // Import the styles for TaskColumn
import { collaps } from '../../assets/Index';
import { FaPlus } from "react-icons/fa6";

const TaskColumn = ({ title, tasks, collapsed, onToggle, onAddTask }) => {
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

                    <img 
                        src={collaps} 
                        alt='Toggle' 
                        onClick={onToggle} 
                        className={StylesTaskColumn.toggleIcon} 
                    />
              </div>
                
            </div>
            {!collapsed && (
                <div className={StylesTaskColumn.taskList}>
                    {tasks.map((task) => (
                        <div key={task._id} className={StylesTaskColumn.taskItem}>
                            <h4>{task.title}</h4>
                            {/* Additional task details can be rendered here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskColumn;
