

const Header = () => {
  return (
    <div className={StylesHeader.header}>
      <div className={StylesHeader.date}>{formattedDate}</div>
      <div className={StylesHeader.filter}>
        <select>
          <option value="thisWeek">This Week</option>
          <option value="today">Today</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
