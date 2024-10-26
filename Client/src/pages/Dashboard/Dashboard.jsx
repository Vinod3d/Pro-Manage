// Dashboard.js
import { useState } from 'react';
import styles from './Dashboard.module.css';
import Sidebar from './Sidebar';
import BoardComponent from '../../components/Board/Board';
import AnalyticsComponent from '../../components/Analytics/Analytics';
import SettingsComponent from '../../components/Settings/Settings';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('Board');

    const mainContent = () => {
        switch (selectedTab) {
            case 'Board':
                return <BoardComponent />;
            case 'Analytics':
                return <AnalyticsComponent />;
            case 'Settings':
                return <SettingsComponent />;
            default:
                return <div>Board Content</div>;
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <Sidebar selectedTab={selectedTab} onSelectTab={setSelectedTab} />

            {/* Main Content */}
            <main className={styles.mainContent}>
                {mainContent()}
            </main>
        </div>
    );
};

export default Dashboard;
