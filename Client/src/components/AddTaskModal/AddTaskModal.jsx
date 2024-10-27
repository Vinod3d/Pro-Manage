/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Styles from './AddTask.module.css';
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTaskModal({isOpen, onClose, }) {
    if(!isOpen) return null;
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('HIGH');
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Done Task', done: true },
    { id: 2, text: 'Task to be done', done: false },
  ]);
  const [dueDate, setDueDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { id: Date.now(), text: '', done: false }]);
  };

  const handleChecklistChange = (id, done) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done } : item));
  };

  const handleChecklistTextChange = (id, text) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, text } : item));
  };

  const handleRemoveChecklistItem = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleDateClick = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    setDatePickerVisible(false);
  };
  
  const handleSave = () => {
    // onSave({ title, priority, assignee, checklist, dueDate });
    onClose();
  };

  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
                {['HIGH', 'MODERATE', 'LOW'].map((p) => (
                    <label key={p} className={Styles.radioLabel}>
                    <input
                        type="radio"
                        value={p}
                        checked={priority === p}
                        onChange={() => setPriority(p)}
                    />
                    <div className={`${Styles.radioLabelGroup} ${priority === p ? Styles.radioActive : ""}`}>
                        <div>
                            <span className={`${p === 'HIGH' ? Styles.radioHigh : p === 'MODERATE' ? Styles.radioModerate : Styles.radioLow} ${Styles.radioColorBox}`}>  </span>
                            {p} PRIORITY
                        </div>
                    </div>

                    </label>
                ))}
                </div>
            </div>
          </div>


          <div className={`${Styles.spacingLarge} ${Styles.checklistSection}`}>
            <label>
              Checklist ({checklist.filter(item => item.done).length}/{checklist.length}) <span className="text-red">*</span>
            </label>
            <ul className={Styles.checklistContainer}>
              {checklist.map((item) => (
                <li key={item.id} className={Styles.checklistItem}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => handleChecklistChange(item.id, e.target.checked)}
                    className={Styles.checklistCheckbox}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChecklistTextChange(item.id, e.target.value)}
                    className={Styles.checklistInput}
                    placeholder="Add a task"
                  />
                  <button onClick={() => handleRemoveChecklistItem(item.id)} className={Styles.checklistRemoveButton}>
                    <MdDelete size={20} />
                  </button>
                </li>
              ))}
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
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
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
