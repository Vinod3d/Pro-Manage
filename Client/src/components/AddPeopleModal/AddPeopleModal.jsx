/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Styles from './addPeople.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMember, clearErrors, clearLastAddedEmail, clearMessage } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';

const AddPeopleModal = ({ onClose, isOpen }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, lastAddedEmail } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (email) {
      dispatch(addMember(email));
      
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(clearMessage())
      setEmail("");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, message, dispatch]);

  const handleClose = () => {
    onClose();
    dispatch(clearLastAddedEmail())
    setEmail("");
  };

  return isOpen ? (
    <div className={Styles.modal}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {lastAddedEmail ? (
          <div className={Styles.addedSuccess}>
            <div className={Styles.messages}>{lastAddedEmail} added to the board</div>
            <button className={`${Styles.btn} ${Styles.btnPrimary}`} onClick={handleClose}>
              Okay, got it!
            </button>
          </div>
        ) : (
          <>
            <h3 className={Styles.modalTitle}>Add people to the board</h3>
            <div className={Styles.modalBody}>
              <input
                type="email"
                placeholder="Enter the email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={Styles.modalFooter}>
              <button className={`${Styles.btn} ${Styles.btnSecondary}`} onClick={handleClose}>
                Cancel
              </button>
              <button className={`${Styles.btn} ${Styles.btnPrimary}`} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Adding...' : 'Add Email'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default AddPeopleModal;
