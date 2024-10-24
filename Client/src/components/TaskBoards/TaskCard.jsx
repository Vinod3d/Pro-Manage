import React from 'react';
import StylesTaskCard from './TaskCard.module.css';

const TaskCard = ({ task }) => {
    const { title, priority, dueDate, checklist } = task;

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'moderate': return 'orange';
            case 'low': return 'green';
            default: return 'gray';
        }
    };

    return (
        <div className={StylesTaskCard.card}>
            <div className={StylesTaskCard.header}>
                <span className={StylesTaskCard.priority} style={{ color: getPriorityColor(priority) }}>
                    {priority.toUpperCase()}
                </span>
                <div className={StylesTaskCard.dueDate} style={{ color: new Date(dueDate) < new Date() && task.status !== 'done' ? 'red' : 'green' }}>
                    {new Date(dueDate).toLocaleDateString()}
                </div>
            </div>
            <h4 className={StylesTaskCard.title}>{title}</h4>
            <div className={StylesTaskCard.checklist}>Checklist ({checklist.completed}/{checklist.total})</div>
            <div className={StylesTaskCard.actions}>
                <button>Edit</button>
                <button>Share</button>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
