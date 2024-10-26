import TaskColumn from './TaskColumn.jsx';
import StylesTaskBoard from './TaskBoard.module.css';
import { useState } from 'react';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';

const TaskBoard = ({ tasks }) => {
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState({
        backlog: false,
        todo: false,
        inprogress: false,
        done: false,
    });

    const toggleCollapse = (column) => {
        setCollapsed((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const handleAddTaskOpen = () => {
        setIsAddTaskModalOpen(true);
    };
    const handleAddTaskClose = () => {
        setIsAddTaskModalOpen(false);
    };
    return (
        <div className={StylesTaskBoard.board}>
                <TaskColumn
                    title="Backlog"
                    tasks={tasks.backlog}
                    collapsed={collapsed.backlog}
                    onToggle={() => toggleCollapse('backlog')}
                />
                <TaskColumn
                    title="To Do"
                    tasks={tasks.todo}
                    collapsed={collapsed.todo}
                    onToggle={() => toggleCollapse('todo')}
                    onAddTask={handleAddTaskOpen}
                />
                <TaskColumn
                    title="In Progress"
                    tasks={tasks.inprogress}
                    collapsed={collapsed.inprogress}
                    onToggle={() => toggleCollapse('inprogress')}
                />
                <TaskColumn
                    title="Done"
                    tasks={tasks.done}
                    collapsed={collapsed.done}
                    onToggle={() => toggleCollapse('done')}
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
