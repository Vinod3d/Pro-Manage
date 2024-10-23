import { useState } from 'react'
import { Analytics, Board, logo, settings } from '../../assets/Index'
import { TbLogout } from "react-icons/tb";
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('Board');

    const mainContent = () => {
        switch (selectedTab) {
          case 'Board':
            return <div>Board Content</div>
          case 'Analytics':
            return <div>Analytics Content</div>
          case 'Settings':
            return <div>Settings Content</div>
          default:
            return <div>Board Content</div>
        }
    }


  return (
    <div className={styles.container}>
      {/* Sidebar */}
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
              onClick={() => setSelectedTab(tab)}
            >
              {tab === 'Board' && <img src={Board} className={styles.navButtonIcon} />}
              {tab === 'Analytics' && <img src={Analytics} className={styles.navButtonIcon} />}
              {tab === 'Settings' && <img src={settings} className={styles.navButtonIcon} />}
              {tab}
            </button>
          ))}
        </nav>
        <div className={styles.logout}>
          <button className={styles.logoutButton}>
            <TbLogout className={styles.logoutButtonIcon} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {mainContent()}
      </main>
    </div>
  )
}

export default Dashboard