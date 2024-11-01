/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { MdExpandMore, MdMoreHoriz } from "react-icons/md";
import StylesTaskCard from './TaskCard.module.css';
import { useDispatch, } from 'react-redux';
import {updateTask } from '../../store/slices/taskSlice';

const TaskCard = ({ task, onEdit, onDelete, onShare, isCollapsed, setCollapsedAll }) => {
    const { taskTitle, assignedTo, priorityLevel, dueDate, checklistItems, taskStatus } = task;
    const [isExpanded, setIsExpanded] = useState(isCollapsed);
    const [checklistHeight, setChecklistHeight] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [localChecklistItems, setLocalChecklistItems] = useState(checklistItems);
    const checklistRef = useRef(null);
    const menuRef = useRef(null);
    const titleRef = useRef(null);
    const dispatch = useDispatch()

    const maxTitleLength = 29;

    useEffect(() => {
        setLocalChecklistItems(checklistItems);
    }, [checklistItems]);

    // tooltip
    const handleMouseEnter = () => {
        if (taskTitle.length > maxTitleLength) {
            setShowTooltip(true);
        }
    };

    const handleMouseLeave = () => setShowTooltip(false);


    // toggle menu
    const toggleMenu = (event) => {
        event.stopPropagation();
        
        if (isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // collapse all opened checklist
    useEffect(() => {
        if (isCollapsed) {
            setIsExpanded(false);
            setCollapsedAll(false);
        }
    }, [isCollapsed, setCollapsedAll]);

    useEffect(() => {
        if (checklistRef.current) {
            setChecklistHeight(checklistRef.current.scrollHeight);
        }
    }, [isExpanded, checklistItems]);

    // getPriorityColor
    const getPriorityColor = (priorityLevel) => {
        switch (priorityLevel) {
            case 'HIGH': return '#FF2473';
            case 'MEDIUM': return '#18B0FF';
            case 'LOW': return '#63C05B';
            default: return 'gray';
        }
    };

    // get Formated Date
    function getFormattedDate(date) {
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    
        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
    
        const dayWithSuffix = day + getOrdinalSuffix(day);
    
        return ` ${month} ${dayWithSuffix}`;
    }

    // get dueDate color
    const getDueDateStyles = (date, status) => {
        const current = new Date();
        const taskDueDate = new Date(date);
        
        if (status === 'DONE') {
            return { color: 'white', backgroundColor: '#63C05B' };
        }
    
        if (taskDueDate < current) {
            return { color: 'white', backgroundColor: '#CF3636' };
        }
    
        return { color: '#5A5A5A', backgroundColor: '#DBDBDB' };
    };


    const handleEdit = ()=>{
        onEdit(task)
        setIsMenuOpen(false)
    }

    const handleDelete = () =>{
        onDelete()
        setIsMenuOpen(false)
    }

    const handleChecklistChange = (itemId) => {
        const updatedChecklist = localChecklistItems.map((item) => ({
            ...item,
            isCompleted: item._id === itemId ? !item.isCompleted : item.isCompleted
        }));
    
        setLocalChecklistItems(updatedChecklist);
        dispatch(updateTask(task._id, { 
            checklistItems: updatedChecklist,
            dueDate: dueDate
         }));
    };

    const handleStatusChange = (status) =>{
        dispatch(updateTask(task._id, { 
            taskStatus: status,
            dueDate: dueDate
         }))
    }
    
    

    return (
        <div className={StylesTaskCard.card}>
            <div className={StylesTaskCard.header}>
                <div className="flex">
                    <span className={`${StylesTaskCard.priorityIndicator}`} style={{backgroundColor:getPriorityColor(priorityLevel)}}/>
                    <span className={StylesTaskCard.priorityText}>
                        {priorityLevel === 'HIGH' ? 'High Priority' : priorityLevel === 'MEDIUM' ? 'Moderate Priority' : 'Low Priority'}
                    </span>
                    {
                        assignedTo ? <div className={StylesTaskCard.avatar}>{assignedTo?.slice(0, 2).toUpperCase()}</div> : null
                    }
                    
                </div>
                <button className={StylesTaskCard.menuButton} onClick={toggleMenu}>
                    <MdMoreHoriz size={24} />
                </button>
                {isMenuOpen && (
                    <div className={StylesTaskCard.menu} ref={menuRef}>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={onShare}>Share</button>
                        <button onClick={handleDelete} style={{color:'#ff2121'}}>Delete</button>
                    </div>
                )}
            </div>

            <h4 
                ref={titleRef} 
                className={StylesTaskCard.title} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {taskTitle}
            </h4>
            {showTooltip  &&  (
                <div className={StylesTaskCard.tooltip}>
                    {taskTitle}
                </div>
            )}

            <div className={StylesTaskCard.checklistSummary}>
                Checklist ({localChecklistItems?.filter(item => item.isCompleted).length}/{localChecklistItems?.length || 0})
                <button className={StylesTaskCard.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
                    <span className={`${StylesTaskCard.expandIcon} ${isExpanded ? StylesTaskCard.rotated : ''}`}>
                        <MdExpandMore />
                    </span>
                </button> 
            </div>

            
                <ul 
                    ref={checklistRef} 
                    className={StylesTaskCard.checklistContainer}
                    style={{
                        height: isExpanded ? `${checklistHeight}px` : '0px',
                    }}
                >
                    {localChecklistItems.map((item) => (
                        <li key={item._id} className={StylesTaskCard.checklistItem}>
                            <input
                                type="checkbox"
                                checked={item.isCompleted}
                                onChange={() => handleChecklistChange(item._id)}
                                className={StylesTaskCard.checklistCheckbox}
                            />
                            <span className={StylesTaskCard.checklistText}>{item.text}</span>
                        </li>
                    ))}
                </ul>
           
            <div className={StylesTaskCard.footer}>
                <span 
                    className={StylesTaskCard.dueDate} 
                    style={{...getDueDateStyles(dueDate, taskStatus), visibility: dueDate ? 'visible' : 'hidden'}}
                >{getFormattedDate(new Date(dueDate))}</span>
                <div className={StylesTaskCard.statusButtons}>
                    {['BACKLOG', 'TODO', 'PROGRESS', 'DONE'].filter((status) => status !== taskStatus).map((status)=>(
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`${StylesTaskCard.statusButton}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
