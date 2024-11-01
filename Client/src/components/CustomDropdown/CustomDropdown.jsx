/* eslint-disable react/prop-types */
import { useState } from 'react';
import Styles from './customDropdown.module.css';

export default function CustomDropdown({ addPeople = [], assignee, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={Styles.customDropdown}>
      <div
        className={Styles.dropdownHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        {assignee || 'Select Email'}
      </div>
      {isOpen && (
        <div className={Styles.dropdownOptions}>
          {addPeople.length > 0 ? (
            addPeople.map((email, index) => (
              <div
                key={index}
                className={Styles.optionItem}
                onClick={() => {
                  onSelect(email);
                  setIsOpen(false);
                }}
              >
                <div className="flex">
                  <div className={Styles.avatar}>{email.slice(0, 2).toUpperCase()}</div>
                  <span className={Styles.emailText}>{email}</span>
                </div>
                <button className={Styles.assignButton}>Assign</button>
              </div>
            ))
          ) : (
            <div className={Styles.noMembers}>No members have been added</div>
          )}
        </div>
      )}
    </div>
  );
}
