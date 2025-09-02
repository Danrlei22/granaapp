import { useEffect, useMemo, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../redux/slices/entriesSlice";
import { fetchExits } from "../redux/slices/exitsSlice";
import Tooltip from "../components/ui/Tooltip";

function Summary() {
  const [selectedQuarter, setSelectedQuarter] = useState(false);
  const [dateByMonth, setDateByMonth] = useState([]);
  const [selectedLastSixMonths, setSelectedLastSixMonths] = useState(false);
  const [selectYear, setSelectYear] = useState("");
  const [showYearSelect, setShowYearSelect] = useState(false);

  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.data);
  const exits = useSelector((state) => state.exits.data);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(fetchEntries());
    dispatch(fetchExits());
  }, [dispatch]);

  const currentMonthEntries = entries.filter((item) => {
    const date = new Date(item.date + "T12:00:00");

    return (
      date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    );
  });

  const currentMonthExits = exits.filter((item) => {
    const date = new Date(item.date + "T12:00:00");

    return (
      date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    );
  });

  const totalEntries = currentMonthEntries.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalExits = currentMonthExits.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const total = totalEntries - totalExits;

  const handleQuarterChange = () => {
    setSelectedQuarter(true);

    const lastThreeMonths = [
      currentMonth,
      (currentMonth - 1 + 12) % 12,
      (currentMonth - 2 + 12) % 12,
    ];

    const filterByLastThreeMonths = (items) =>
      items.filter((item) => {
        const date = new Date(item.date + "T12:00:00");
        return (
          lastThreeMonths.includes(date.getMonth() + 1) &&
          date.getFullYear() === currentYear
        );
      });

    const lastThreeEntries = filterByLastThreeMonths(entries);
    const lastThreeExits = filterByLastThreeMonths(exits);

    const data = lastThreeMonths.map((month) => {
      const entriesSum = lastThreeEntries
        .filter((e) => new Date(e.date + "T12:00:00").getMonth() + 1 === month)
        .reduce((acc, e) => acc + e.amount, 0);

      const exitsSum = lastThreeExits
        .filter((e) => new Date(e.date + "T12:00:00").getMonth() + 1 === month)
        .reduce((acc, e) => acc + e.amount, 0);

      return {
        month,
        entries: entriesSum,
        exits: exitsSum,
        total: entriesSum - exitsSum,
      };
    });

    setDateByMonth(data);
  };

  const handleLastSixMonthsChange = () => {
    setSelectedLastSixMonths(true);

    const today = new Date();

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(
        currentMonthStart.getFullYear(),
        currentMonthStart.getMonth() - i,
        1
      );

      return {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    });

    const filterByLastSixMonths = (items) => {
      return items.filter((item) => {
        const date = new Date(item.date + "T12:00:00");

        return lastSixMonths.some(
          (m) =>
            m.month === date.getMonth() + 1 && m.year === date.getFullYear()
        );
      });
    };

    const lastSixEntries = entries ? filterByLastSixMonths(entries) : [];
    const lastSixExits = exits ? filterByLastSixMonths(exits) : [];

    const data = lastSixMonths.map(({ month, year }) => {
      const entriesSum = lastSixEntries
        .filter((e) => {
          const date = new Date(e.date + "T12:00:00");
          return date.getMonth() + 1 === month && date.getFullYear() === year;
        })
        .reduce((acc, e) => acc + e.amount, 0);

      const exitsSum = lastSixExits
        .filter((e) => {
          const date = new Date(e.date + "T12:00:00");
          return date.getMonth() + 1 === month && date.getFullYear() === year;
        })
        .reduce((acc, e) => acc + e.amount, 0);

      return {
        month,
        year,
        entries: entriesSum,
        exits: exitsSum,
        total: entriesSum - exitsSum,
      };
    });

    setDateByMonth(data);
  };

  const handleYearChange = (newYear) => {
    setSelectYear(newYear);

    const filteredEntries = entries.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === parseInt(newYear)
    );
    const filteredExits = exits.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === parseInt(newYear)
    );

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const data = months.map((month) => {
      const entriesSum = filteredEntries
        .filter((e) => {
          const date = new Date(e.date + "T12:00:00");
          return (
            date.getMonth() + 1 === month &&
            date.getFullYear() === parseInt(newYear)
          );
        })
        .reduce((acc, e) => acc + e.amount, 0);

      const exitsSum = filteredExits
        .filter((e) => {
          const date = new Date(e.date + "T12:00:00");
          return (
            date.getMonth() + 1 === month &&
            date.getFullYear() === parseInt(newYear)
          );
        })
        .reduce((acc, e) => acc + e.amount, 0);

      return {
        month,
        year: parseInt(newYear),
        entries: entriesSum,
        exits: exitsSum,
        total: entriesSum - exitsSum,
      };
    });

    setDateByMonth(data);
  };

  const availableYears = useMemo(() => {
    return [
      ...new Set(
        [...entries, ...exits].map((item) => new Date(item.date).getFullYear())
      ),
    ].sort((a, b) => b - a);
  }, [entries, exits]);

  return (
    <div className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base h-auto">
      <h1 className="text-center font-bold text-4xl my-4">Summary</h1>

      <div className="flex flex-col sm:flex-row justify-center items-center w-auto gap-2 flex-wrap">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:p-2 p-1 ">
          <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
            <h2 className="font-bold text-2xl box-info sm:mb-4 mb-2">
              Balance for the month
            </h2>
            <div className="overflow-x-auto w-auto max-w-[320px] sm:max-w-[640px]">
              <table className="border-2 border-tertiary text-center min-w-[400px]">
                <thead className="bg-tertiary text-white">
                  <tr>
                    <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                      Month
                    </th>
                    <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                      Entry
                    </th>
                    <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                      Exit
                    </th>
                    <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuarter || selectedLastSixMonths || selectYear ? (
                    dateByMonth.length > 0 ? (
                      dateByMonth.map((item) => (
                        <tr key={`${item.year}-${item.month}`}>
                          <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                            {new Date(0, item.month - 1)
                              .toLocaleDateString("en-US", {
                                month: "long",
                              })
                              .toUpperCase()}
                          </td>
                          <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                            R$ {item.entries.toFixed(2)}
                          </td>
                          <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                            R$ -{item.exits.toFixed(2)}
                          </td>
                          <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                            <strong>R$ {item.total.toFixed(2)}</strong>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-2 text-black italic"
                        >
                          No entry or exit found for selected date.
                        </td>
                      </tr>
                    )
                  ) : (
                    // MES ATUAL
                    <tr>
                      <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                        {new Date()
                          .toLocaleDateString("en-US", {
                            month: "long",
                          })
                          .toUpperCase()}
                      </td>
                      <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                        R$ {totalEntries.toFixed(2)}
                      </td>
                      <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                        R$ -{totalExits.toFixed(2)}
                      </td>
                      <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                        <strong>R$ {total.toFixed(2)}</strong>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* filtro */}
        <div className="flex flex-col items-start justify-center w-auto border-box shadow-2xl shadow-tertiary">
          <h2 className="font-bold pl-2">Period filter:</h2>
          <div className="flex flex-row w-auto h-[60px] border-2 border-tertiary gap-2 p-2 m-1">
            <Tooltip text="Filter last 3 months" position="bottom">
              <button
                onClick={handleQuarterChange}
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Quarter
              </button>
            </Tooltip>
            <Tooltip text="Filter last 6 months" position="bottom">
              <button
                onClick={handleLastSixMonthsChange}
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Last 6 months
              </button>
            </Tooltip>
            <Tooltip text="Filter by year" position="bottom">
              <button
                onClick={() => setShowYearSelect(true)}
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Year
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-col items-start justify-center w-full">
            {showYearSelect && (
              <select
                name="year"
                className="flex flex-col w-auto h-auto sm:text-sm bg-blue-300 p-0.5 m-1 border-2 border-tertiary rounded ml-44"
                value={selectYear}
                onChange={(e) => handleYearChange(e.target.value)}
                required
              >
                <option value="">Select year</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
            {(selectedQuarter || selectedLastSixMonths || showYearSelect) && (
              <div className="w-full text-center mt-4">
                <span
                  onClick={() => {
                    setSelectedQuarter(false);
                    setSelectedLastSixMonths(false);
                    setShowYearSelect(false);
                    setSelectYear("");
                  }}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Clean filter
                </span>
              </div>
            )}
          </div>
        </div>
        {/* tooltip nos botoes de data */}

        {/* Destaques do periodo */}
        <div className="bg-primary text-black flex flex-col justify-between items-center sm:p-4 p-1 mb-4 border-box w-auto min-w-[290px] h-auto min-h-[380px] shadow-2xl shadow-tertiary text-xs sm:text-base">
          <h2 className="font-bold text-2xl box-info sm:mb-4 mb-2">
            Highlights of the year
          </h2>

          <div className="box-info mb-4">
            <p className="font-bold text-xl">Bigger balance:</p>
            <p className="font-bold text-xl text-green-600">R$ +5.000,00</p>
            <p>in: february</p>
          </div>

          <div className="box-info mb-4">
            <p className="font-bold text-xl">Lowest balance:</p>
            <p className="font-bold text-xl text-red-600">R$ -2.000,00</p>
            <p>in: march</p>
          </div>

          <div className="box-info mb-4">
            <p className="font-bold text-xl">Monthly average</p>
            <div className="flex sm:flex-row flex-col justify-between items-center">
              <p className="font-bold text-base">Entry: </p>
              <p className="text-green-600 font-bold text-xl">R$ + 5.500,00</p>
            </div>

            <div className="flex sm:flex-row flex-col justify-between items-center">
              <p className="font-bold text-base">Exit: </p>
              <p className="text-red-600 font-bold text-xl">R$ - 3.500,00</p>
            </div>
          </div>
          <div>
            <button className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
