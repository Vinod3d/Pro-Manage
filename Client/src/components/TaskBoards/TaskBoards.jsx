import TaskColumn from './TaskColumn.jsx';
import StylesTaskBoard from './TaskBoard.module.css';

const TaskBoard = ({ tasks }) => {
    return (
        <div className={StylesTaskBoard.board}>
            <TaskColumn title="Backlog" tasks={tasks.backlog} />
            <TaskColumn title="To Do" tasks={tasks.todo} />
            <TaskColumn title="In Progress" tasks={tasks.inprogress} />
            <TaskColumn title="Done" tasks={tasks.done} />
        </div>
    );
};

export default TaskBoard;
