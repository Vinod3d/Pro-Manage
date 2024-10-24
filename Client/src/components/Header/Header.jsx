import { useSelector } from 'react-redux';
import Styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { GoPeople } from "react-icons/go";
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal';

const Header = ({ selectedOption, handleSelectChange }) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false)
  const [email, setEmail] = useState('');
  const {user} = useSelector((state)=>state.user)


  useEffect(()=>{
    const date = new Date();
    getFormattedDate(date)
  },[])

  function getFormattedDate(date) {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const dayWithSuffix = day + getOrdinalSuffix(day);

    const formatted = `${dayWithSuffix} ${month}, ${year}`;
    setFormattedDate(formatted);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = () => {
    
  }

  return (
    <>
      <div className={Styles.headerContainer}>
        <div className={Styles.headerTitle}>Welcome! {user.name}</div>
        <div className={Styles.headerDate}>{formattedDate}</div>
      </div>
      <div className={Styles.headerContainer}>
        <div className={Styles.headerGroup}>
          <div className={Styles.headerTitle2}>Board</div>
          <div 
          className={Styles.addPeople}
          onClick={() => setIsPeopleModalOpen(true)}
          ><GoPeople /> Add People</div>

        </div>
        <div className={Styles.headerMenu}>
          <select
            className={Styles.dropdown}
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="today">Today</option>
            <option selected value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
          </select>
        </div>
      </div>

      <AddPeopleModal
        email={email}
        onChange={handleEmailChange}
        onSubmit={handleEmailSubmit}
        onClose={()=>setIsPeopleModalOpen(false)}
        isOpen={isPeopleModalOpen}
      />
    </>
  );
};

export default Header;
