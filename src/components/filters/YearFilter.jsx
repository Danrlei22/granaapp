import { useMemo, useState } from "react";

function YearFilter({ onYearChange, entries }) {
  const [selectYear, setSelectYear] = useState("");

  const availableYears = useMemo(() => {
    const years = entries.map((item) => {
      const date = new Date(item.date + "T12:00:00");
      return date.getFullYear();
    });
    return [...new Set(years)].sort((a, b) => b - a);
  }, [entries]);

  const handleChange = (e) => {
    const newYear = e.target.value;

    setSelectYear(newYear);
    onYearChange(newYear);
  };

  return (
    <select
      name="year"
      className="flex flex-col w-auto h-auto sm:text-sm bg-blue-300 p-0.5 m-1 border-2 border-tertiary rounded ml-52"
      value={selectYear}
      onChange={handleChange}
      required
    >
      <option value="">Select year</option>
      {availableYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearFilter;
