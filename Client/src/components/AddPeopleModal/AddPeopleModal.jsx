/* eslint-disable react/prop-types */
import Styles from './addPeople.module.css'

const AddPeopleModal = ({email, onChange, onClose, onSubmit, isOpen }) => {
    if (!isOpen) return null
    
  return (
    <div className={Styles.modal}>
      <div className={Styles.modalContent}>
        <h3 className={Styles.modalTitle}>Add people to the board</h3>
        <div className={Styles.modalBody}>
          <input
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className={Styles.modalFooter}>
          <button className={`${Styles.btn} ${Styles.btnSecondary}`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${Styles.btn} ${Styles.btnPrimary}`} onClick={onSubmit}> 
            Add Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPeopleModal