import { useState } from "react";

function DataFilter({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (e) => {
    const newDate = e.target.value;

    setSelectedDate(newDate);
    onDateChange(newDate)
  };

  return (
    <>
      <input type="date" className="bg-blue-500 p-0.5 m-1 border-2 border-tertiary" value={selectedDate} onChange={handleChange} />
    </>
  );
}

export default DataFilter;
