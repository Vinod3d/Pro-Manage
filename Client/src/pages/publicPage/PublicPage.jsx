import { useEffect } from "react";
import { logo } from "../../assets/Index";
import styles from "./public.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById } from "../../store/slices/singleTaskSlice";
import { useParams } from "react-router-dom";

const PublicPage = () => {
  const { task, loading, error } = useSelector((state) => state.singleTask);
  const {
    taskTitle,
    priorityLevel,
    dueDate,
    checklistItems = [],
  } = task || {};
  const dispatch = useDispatch();
  const { taskId } = useParams();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchTaskById(taskId));
    };
    getData();
  }, [dispatch, taskId]);

  const getPriorityColor = (priorityLevel) => {
    switch (priorityLevel) {
      case "HIGH":
        return "#FF2473";
      case "MEDIUM":
        return "#18B0FF";
      case "LOW":
        return "#63C05B";
      default:
        return "gray";
    }
  };

  function getFormattedDate(date) {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );

    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const dayWithSuffix = day + getOrdinalSuffix(day);

    return ` ${month} ${dayWithSuffix}`;
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <img src={logo} alt="logo" className={styles.titleIcon} />
          Pro Manage
        </h1>
      </header>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className="flex">
            <span
              className={`${styles.priorityIndicator}`}
              style={{ backgroundColor: getPriorityColor(priorityLevel) }}
            />
            <span className={styles.priorityText}>
              {priorityLevel === "HIGH"
                ? "High Priority"
                : priorityLevel === "MEDIUM"
                ? "Moderate Priority"
                : "Low Priority"}
            </span>
          </div>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              {taskTitle || "Task Details"}
            </h3>
          </div>
        </div>
        <div className={styles.cardContent}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading task details</p>
          ) : (
            <>
              <div
                className={`${styles.spacingLarge} ${styles.checklistSection}`}
              >
                <label>
                  Checklist (
                  {checklistItems.filter((item) => item.isCompleted).length}/
                  {checklistItems.length}) *
                </label>
                <ul className={styles.checklistContainer}>
                  {checklistItems.map((item, index) => (
                    <li key={index} className={styles.checklistItem}>
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        className={styles.checklistCheckbox}
                        readOnly
                      />
                      {/* <input
                        type="text"
                        value={item.text}
                        className={styles.checklistInput}
                        readOnly
                      /> */}

                      <div  className={styles.checklistInput}>{item.text}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.dueDateContainer}>
                <div className={styles.dueDateLabel}>Due Date</div>
                {dueDate ? (
                  <span
                    className={styles.dueDate}
                    style={{ visibility: dueDate ? "visible" : "hidden" }}
                  >
                    {getFormattedDate(new Date(dueDate))}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
