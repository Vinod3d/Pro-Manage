/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Styles from './EditTask.module.css';
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../store/slices/taskSlice";

export default function EditTaskModal({task, isOpen, onClose, }) {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.user);
  const addPeople = user?.user?.addPeople || user?.addPeople;
  
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('HIGH');
  const [assignee, setAssignee] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const {_id: taskId, taskTitle, priorityLevel, assignedTo, checklistItems, dueDate: taskDueDate } = task || {};
  const isSaveDisabled = checklist.length === 0 || !checklist.some((item) => item.text.trim() !== "");

  useEffect(() => {
    if (task) {
      setTitle(taskTitle || '');
      setPriority(priorityLevel || 'HIGH');
      setAssignee(assignedTo || '');
      setChecklist(checklistItems || []);
      setDueDate(taskDueDate ? new Date(taskDueDate) : null);
    }
  }, [task, taskTitle, priorityLevel, assignedTo, checklistItems, taskDueDate]);


  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { _id: Date.now(), text: '', isCompleted: false }]);
  };

  const handleChecklistChange = (id, done) => {
    setChecklist(checklist.map(item => item._id === id ? { ...item, isCompleted:done } : item));
  };

  const handleChecklistTextChange = (id, text) => {
    setChecklist(checklist.map(item => item._id === id ? { ...item, text } : item));
  };

  const handleRemoveChecklistItem = (id) => {
    setChecklist(checklist.filter(item => item._id !== id));
  };

  const handleDateClick = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    setDatePickerVisible(false);
  };
  
  const handleSave = () => {
    const updatedTaskData = {
      taskTitle: title,
      priorityLevel: priority,
      assignedTo: assignee,
      checklistItems: checklist.map((item) => ({
        text: item.text,
        isCompleted: item.isCompleted,
      })),
      dueDate: dueDate ? dueDate.toISOString() : null,
    };

    dispatch(updateTask(taskId, updatedTaskData));
    onClose();
  };

  const handleSelectAssignee = (email) => {
    setAssignee(email);
  };

  useEffect(() => {
    if (!isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 400);
  };

  if(!isOpen) return null;

  return (
    <div className={Styles.modalOverlay} onClick={handleClose}>
      <div className={`${Styles.modalContent} ${isClosing ? Styles.modalClose : Styles.modalOpen}`} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.paddingLarge}>
          <div className={`${Styles.spacingLarge} ${Styles.titleSection}`}>
            <label htmlFor="title">
              Title <span className="text-red">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={Styles.inputField}
              placeholder="Enter Task Title"
            />
          </div>

          <div className={Styles.spacingLarge}>
            <div className={Styles.priorityGroup}>
                <label>
                Select Priority <span className="text-red">*</span>
                </label>
                <div className={Styles.radioGroup}>
                {['HIGH', 'MEDIUM', 'LOW'].map((p) => (
                    <label key={p} className={Styles.radioLabel}>
                    <input
                        type="radio"
                        value={p}
                        checked={priority === p}
                        onChange={() => setPriority(p)}
                    />
                    <div className={`${Styles.radioLabelGroup} ${priority === p ? Styles.radioActive : ""}`}>
                        <div>
                            <span className={`${p === 'HIGH' ? Styles.radioHigh : p === 'MEDIUM' ? Styles.radioModerate : Styles.radioLow} ${Styles.radioColorBox}`}>  </span>
                            {p} PRIORITY
                        </div>
                    </div>

                    </label>
                ))}
                </div>
            </div>
          </div>

          <div className={`${Styles.spacingLarge} ${Styles.assignField}`}>
            <label htmlFor="assignee">
              Assign to
            </label>
            <CustomDropdown
              addPeople={addPeople}
              assignee={assignee}
              onSelect={handleSelectAssignee}
            />
          </div>

          <div className={`${Styles.spacingLarge} ${Styles.checklistSection}`}>
            <label>
              Checklist ({checklist.filter(item => item.isCompleted).length}/{checklist.length}) *
            </label>
            <ul className={Styles.checklistContainer}>
              {checklist.map((item) => (
                <li key={item._id} className={Styles.checklistItem}>
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={(e) => handleChecklistChange(item._id, e.target.checked)}
                    className={Styles.checklistCheckbox}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChecklistTextChange(item._id, e.target.value)}
                    className={Styles.checklistInput}
                    placeholder="Add a task"
                  />
                  <button onClick={() => handleRemoveChecklistItem(item._id)} className={Styles.checklistRemoveButton}>
                    <MdDelete size={20} />
                  </button>
                </li>
              ))}
              {
                isSaveDisabled ?
                <p className={Styles.noteMessage}>Note: Please add at least one checklist item; otherwise, you will not be able to save the task.</p>
                : null
              }
            </ul>
            <button onClick={handleAddChecklistItem} className={Styles.addChecklistButton}>
              <FaPlus  size={16} /> Add New
            </button>
        </div>

        <div className={`${Styles.spacingLarge} flex justify-between`}>
            <div>
                <label onClick={handleDateClick} className={Styles.dueDateLabel}>
                {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
                </label>
                {isDatePickerVisible && (
                   <div className={Styles.datePickerModal}>
                    <DatePicker
                        selected={dueDate}
                        onChange={handleDateChange}
                        inline
                    />
                 </div>
                )}
            </div>

                <div className={Styles.modalFooter}>
                    <button
                        type="button"
                        onClick={handleSave}
                        className={Styles.saveButton}
                        disabled={isSaveDisabled}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className={Styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
        </div>
        </div>
      </div>
    </div>
  );
}
