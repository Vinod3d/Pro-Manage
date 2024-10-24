import { useEffect, useState } from 'react'
import { Analytics, Board, logo, settings } from '../../assets/Index'
import { TbLogout } from "react-icons/tb";
import styles from './Dashboard.module.css'
import BoardComponent from '../../components/Board/Board';
import AnalyticsComponent from '../../components/Analytics/Analytics';
import SettingsComponent from '../../components/Settings/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessage, logout } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../../components/LogOutModal/LogoutModal';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('Board');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const dispatch = useDispatch()
    const {isAuthenticated , error, message} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    

    const mainContent = () => {
        switch (selectedTab) {
          case 'Board':
            return <BoardComponent/>
          case 'Analytics':
            return <AnalyticsComponent/>
          case 'Settings':
            return <SettingsComponent/>
          default:
            return <div>Board Content</div>
        }
    }

    const handleLogout = () =>{
        dispatch(logout())
    }

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
        if(error){
            toast.error(error)
            dispatch(clearErrors());
        }

        if(message){
            toast.success(message);
            dispatch(clearMessage())
            navigate('/login')
        }
    },[error, message, dispatch, navigate, isAuthenticated])


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
          <button className={styles.logoutButton} onClick={() => setIsLogoutModalOpen(true)}>
            <TbLogout className={styles.logoutButtonIcon} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {mainContent()}
      </main>

      {/* modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default Dashboard