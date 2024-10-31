/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Analytics, Board, logo, settings } from '../../assets/Index';
import { TbLogout } from "react-icons/tb";
import styles from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import { logout, } from '../../store/slices/userSlice';
import OkModal from '../../components/okModal/okModal';

const Sidebar = ({ selectedTab, onSelectTab }) => {
    const [isOkModalOpen, setIsOkModalOpen] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h1 className={styles.sidebarTitle}>
                    <img src={logo} alt="logo" className={styles.titleIcon} />
                    Pro Manage
                </h1>
            </div>
            <nav className={styles.nav}>
                {['Board', 'Analytics', 'Settings'].map((tab) => (
                    <button
                        key={tab}
                        className={`${styles.navButton} ${selectedTab === tab ? styles.navButtonActive : ''}`}
                        onClick={() => onSelectTab(tab)}
                    >
                        {tab === 'Board' && <img src={Board} className={styles.navButtonIcon} alt="Board Icon" />}
                        {tab === 'Analytics' && <img src={Analytics} className={styles.navButtonIcon} alt="Analytics Icon" />}
                        {tab === 'Settings' && <img src={settings} className={styles.navButtonIcon} alt="Settings Icon" />}
                        {tab}
                    </button>
                ))}
            </nav>
            <div className={styles.logout}>
                <button className={styles.logoutButton} onClick={() => setIsOkModalOpen(true)}>
                    <TbLogout className={styles.logoutButtonIcon} />
                    Log out
                </button>
            </div>

            {/* Logout Modal */}
            <OkModal
                isOpen={isOkModalOpen}
                onClose={() => setIsOkModalOpen(false)}
                onOk={handleLogout}
                titleText={'Are you sure you want to Logout?'}
                btnText={' Yes, Logout'}            />
        </aside>
    );
};

export default Sidebar;
