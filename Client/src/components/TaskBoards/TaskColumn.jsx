
import TaskCard from './TaskCard';
import StylesTaskColumn from './TaskColumn.module.css';

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className={StylesTaskColumn.column}>
            <h3>{title}</h3>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;
