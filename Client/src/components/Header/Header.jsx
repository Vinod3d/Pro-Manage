/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { GoPeople } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal';
import { useRef } from 'react';

const Header = ({ selectedOption, handleSelectChange }) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [isPeopleModalOpen, setIsPeopleModalOpen] = useState(false)
  const [email, setEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {user} = useSelector((state)=>state.user)
  const options = [
    { value: 'today', label: 'Today' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
  ];

  const dropdownRef = useRef(null);


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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    handleSelectChange(option.value);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

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
          <div className={Styles.customDropdown} onClick={toggleDropdown} ref={dropdownRef}>
            <div className={Styles.dropdownSelected}>
              {options.find((option) => option.value === selectedOption)?.label || 'Select an option'}<RiArrowDropDownLine className={Styles.selectIcon}/>
            </div>
            {dropdownOpen && (
              <ul className={Styles.dropdownList}>
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={`${Styles.dropdownItem} ${option.value === selectedOption ? Styles.active : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
