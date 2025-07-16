import { useState } from "react";

function MonthFilter({ onMonthChange }) {
  const [selectMonth, setSelectMonth] = useState("");

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
        <option value="0">Jan</option>
        <option value="1">Feb</option>
        <option value="2">Mar</option>
        <option value="3">Apr</option>
        <option value="4">May</option>
        <option value="5">Jun</option>
        <option value="6">Jul</option>
        <option value="7">Aug</option>
        <option value="8">Sep</option>
        <option value="9">Oct</option>
        <option value="10">Nov</option>
        <option value="11">Dec</option>
      </select>
    </>
  );
}

export default MonthFilter;
