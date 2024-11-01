/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Settings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessage, logout, updateUser } from '../../store/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const dispatch = useDispatch();
  const {user, loading, message, error } = useSelector((state) => state.user);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const userData = {
      name,
      email,
      oldPassword,
      newPassword,
    };

    dispatch(updateUser(userData));
  };

  useEffect(()=>{
    if (message) {
      toast.success(message);
      dispatch(clearMessage());

      if (email || newPassword) {
        dispatch(logout());
        navigate('/login');
      }

      setName('');
      setEmail('');
      setOldPassword('');
      setNewPassword('');
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  },[error, message, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.heading}>Settings</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <FiUser className={styles.icon} size={20} />
            <input
              type="text"
              placeholder={user?.name || user?.user?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <FiMail className={styles.icon} size={20} />
            <input
              type="email"
              placeholder={user?.email || user?.user?.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <FiLock className={styles.icon} size={20} />
            <input
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className={styles.toggleButton}
            >
              {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <div className={styles.inputContainer}>
            <FiLock className={styles.icon} size={20} />
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={styles.toggleButton}
            >
              {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings