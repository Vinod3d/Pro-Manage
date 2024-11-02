/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Styles from "./AddTask.module.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  // clearMessage,
  createTask,
} from "../../store/slices/taskSlice";
import { toast } from "react-toastify";

export default function AddTaskModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [checklist, setChecklist] = useState([
    { id: Date.now(), text: "", done: false },
  ]);
  const [dueDate, setDueDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.task);

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { id: Date.now(), text: "", done: false }]);
  };

  const handleChecklistChange = (id, done) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, done } : item))
    );
  };

  const handleChecklistTextChange = (id, text) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleRemoveChecklistItem = (id) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleDateClick = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    setDatePickerVisible(false);
  };

  const handleSave = () => {
    const taskData = {
      taskTitle: title,
      priorityLevel: priority,
      checklistItems: checklist.map((item) => ({
        text: item.text,
        isCompleted: item.done,
      })),
      dueDate: dueDate ? dueDate.toISOString() : null,
    };

    dispatch(createTask(taskData));
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    // if (message) {
    //   // toast.success(message);
    //   dispatch(clearMessage());
    // }
  }, [message, error, dispatch]);

  useEffect(() => {
    if (!isOpen) setIsClosing(false);
  }, [isOpen]);


  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;
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
                {["HIGH", "MEDIUM", "LOW"].map((p) => (
                  <label key={p} className={Styles.radioLabel}>
                    <input
                      type="radio"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                    />
                    <div
                      className={`${Styles.radioLabelGroup} ${
                        priority === p ? Styles.radioActive : ""
                      }`}
                    >
                      <div>
                        <span
                          className={`${
                            p === "HIGH"
                              ? Styles.radioHigh
                              : p === "MEDIUM"
                              ? Styles.radioModerate
                              : Styles.radioLow
                          } ${Styles.radioColorBox}`}
                        >
                          {" "}
                        </span>
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
              Checklist ({checklist.filter((item) => item.done).length}/
              {checklist.length}) <span className="text-red">*</span>
            </label>
            <ul className={Styles.checklistContainer}>
              {checklist.map((item) => (
                <li key={item.id} className={Styles.checklistItem}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) =>
                      handleChecklistChange(item.id, e.target.checked)
                    }
                    className={Styles.checklistCheckbox}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) =>
                      handleChecklistTextChange(item.id, e.target.value)
                    }
                    className={Styles.checklistInput}
                    placeholder="Add a task"
                  />
                  <button
                    onClick={() => handleRemoveChecklistItem(item.id)}
                    className={Styles.checklistRemoveButton}
                  >
                    <MdDelete size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleAddChecklistItem}
              className={Styles.addChecklistButton}
            >
              <FaPlus size={16} /> Add New
            </button>
          </div>

          <div className={`${Styles.spacingLarge} flex justify-between`}>
            <div>
              <label onClick={handleDateClick} className={Styles.dueDateLabel}>
                {dueDate ? dueDate.toLocaleDateString() : "Select Due Date"}
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
                {loading ? "Saving..." : "Save"}
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
