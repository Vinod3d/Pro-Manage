import { useEffect } from 'react';
import styles from './Analytics.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/slices/analyticsSlice';

export default function Analytics() {
  const analytics = useSelector(state => state.analytics.analytics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const leftColumnStats = [
    { name: "Backlog Tasks", value: analytics.backlog },
    { name: "To-do Tasks", value: analytics.todo },
    { name: "In-Progress Tasks", value: analytics.inProgress },
    { name: "Completed Tasks", value: analytics.done },
  ];

  const rightColumnStats = [
    { name: "Low Priority", value: analytics.lowPriority },
    { name: "Moderate Priority", value: analytics.moderatePriority },
    { name: "High Priority", value: analytics.highPriority },
    { name: "Due Date Tasks", value: analytics.dueDateTasks },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analytics</h1>
      <div className={styles.analyticsWrapper}>
        <div className={styles.columns}>
          <div className={`${styles.leftColumn} ${styles.columnSpacing}`}>
            {leftColumnStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNameWrapper}>
                  <div className={styles.dot}></div>
                  <span className={styles.statName}>{stat.name}</span>
                </div>
                <span className={styles.statValue}>{stat.value.toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
          <div className={`${styles.rightColumn} ${styles.columnSpacing}`}>
            {rightColumnStats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNameWrapper}>
                  <div className={styles.dot}></div>
                  <span className={styles.statName}>{stat.name}</span>
                </div>
                <span className={styles.statValue}>{stat.value.toString().padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
