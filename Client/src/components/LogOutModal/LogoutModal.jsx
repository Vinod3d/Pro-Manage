/* eslint-disable react/prop-types */
import styles from './LogoutModal.module.css'

export default function LogoutModal({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer}>
        <h3 className={styles.modalTitle}>Are you sure you want to Logout?</h3>
        <div className={styles.buttonContainer}>
          <button onClick={onLogout} className={styles.logoutButton}>
            Yes, Logout
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
