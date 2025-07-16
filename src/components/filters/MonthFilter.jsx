import { useState } from "react";

function MonthFilter({ onMonthChange }) {
  const [selectMonth, setSelectMonth] = useState("");
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();

  const handleChange = (e) => {
    const newMonth = e.target.value;

    setSelectMonth(newMonth);
    onMonthChange(newMonth);
  };

  return (
    <>
      <select
        name="month"
        className="flex flex-col w-auto h-auto sm:text-sm bg-blue-300 p-0.5 m-1 border-2 border-tertiary rounded ml-16"
        value={selectMonth}
        onChange={handleChange}
        required
      >
        <option value="">Select month</option>
        {monthName.slice(0, currentMonth + 1).map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </>
  );
}

export default MonthFilter;
