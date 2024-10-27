import { useState } from 'react';

import styles from './Analytics.module.css';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    backlogTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDateTasks: 0,
  });



  const leftColumnStats = [
    { name: "Backlog Tasks", value: analyticsData.backlogTasks },
    { name: "To-do Tasks", value: analyticsData.todoTasks },
    { name: "In-Progress Tasks", value: analyticsData.inProgressTasks },
    { name: "Completed Tasks", value: analyticsData.completedTasks },
  ];

  const rightColumnStats = [
    { name: "Low Priority", value: analyticsData.lowPriority },
    { name: "Moderate Priority", value: analyticsData.moderatePriority },
    { name: "High Priority", value: analyticsData.highPriority },
    { name: "Due Date Tasks", value: analyticsData.dueDateTasks },
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
