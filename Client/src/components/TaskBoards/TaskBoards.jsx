/* eslint-disable react/prop-types */
import TaskColumn from './TaskColumn.jsx';
import StylesTaskBoard from './TaskBoard.module.css';
import { useState } from 'react';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';

const TaskBoard = ({ tasks }) => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    const handleAddTaskOpen = () => {
        setIsAddTaskModalOpen(true);
    };
    const handleAddTaskClose = () => {
        setIsAddTaskModalOpen(false);
    };

    const tasksByStatus = {
        backlog: tasks?.filter((task) => task.taskStatus === 'BACKLOG'),
        todo: tasks?.filter((task) => task.taskStatus === 'TODO'),
        inprogress: tasks?.filter((task) => task.taskStatus === 'PROGRESS'),
        done: tasks?.filter((task) => task.taskStatus === 'DONE'),
    };
    return (
        <div className={StylesTaskBoard.board}>
                <TaskColumn
                    title="Backlog"
                    tasks={tasksByStatus.backlog}
                />
                <TaskColumn
                    title="To Do"
                    tasks={tasksByStatus.todo}
                    onAddTask={handleAddTaskOpen}
                />
                <TaskColumn
                    title="In Progress"
                    tasks={tasksByStatus.inprogress}
                />
                <TaskColumn
                    title="Done"
                    tasks={tasksByStatus.done}
                />

                {/* <AddTaskModal   /> */}
                <AddTaskModal 
                    isOpen={isAddTaskModalOpen}
                    onClose={handleAddTaskClose}
                />
        </div>
    );
};

export default TaskBoard;
