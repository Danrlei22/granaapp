import { useEffect, useMemo, useState, useRef } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../redux/slices/entriesSlice";
import { fetchExits } from "../redux/slices/exitsSlice";
import Tooltip from "../components/ui/Tooltip";
import jsPDF from "jspdf";
import logoName from "../assets/logoName.PNG";
import html2canvas from "html2canvas";
import Loading from "../components/Loading";

function Summary() {
  const [selectedQuarter, setSelectedQuarter] = useState(false);
  const [dateByMonth, setDateByMonth] = useState([]);
  const [selectedLastSixMonths, setSelectedLastSixMonths] = useState(false);
  const [selectYear, setSelectYear] = useState("");
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [loading, setLoading] = useState(true);

  const highlighRef = useRef(null);

  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.data);
  const exits = useSelector((state) => state.exits.data);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchEntries());
      await dispatch(fetchExits());
      setLoading(false);
    };

    fetchData();
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

  if (loading) {
    return <Loading />;
  }

  const biggestEntry = () => {
    const yearEntries = entries.filter(
      (item) => new Date(item.date + "T12:00:00").getFullYear() === currentYear
    );

    if (yearEntries.length === 0) return { value: 0, month: null };

    return yearEntries.reduce(
      (max, item) => {
        const date = new Date(item.date + "T12:00:00");
        const month = date.toLocaleDateString("en-US", { month: "long" });
        const amount = Number(item.amount);

        return amount > max.value ? { value: amount, month } : max;
      },
      { value: 0, month: null }
    );
  };
  const { value: biggestEntryValue, month: biggestEntryMonth } = biggestEntry();

  const biggestExit = () => {
    const yearExits = exits.filter(
      (item) => new Date(item.date + "T12:00:00").getFullYear() === currentYear
    );

    if (yearExits.length === 0) return { value: 0, month: null };

    return yearExits.reduce(
      (max, item) => {
        const date = new Date(item.date + "T12:00:00");
        const month = date.toLocaleDateString("en-US", { month: "long" });
        const amount = Number(item.amount);
        return amount > max.value ? { value: amount, month } : max;
      },
      { value: 0, month: null }
    );
  };
  const { value: biggestExitValue, month: biggestExitMonth } = biggestExit();

  const averageEntries = () => {
    const yearEntries = entries.filter(
      (item) => new Date(item.date + "T12:00:00").getFullYear() === currentYear
    );

    if (yearEntries.length === 0) return { value: 0 };

    const total = yearEntries.reduce((acc, item) => {
      const amount = Number(item.amount);
      return (acc = acc + amount);
    }, 0);

    const average = total / yearEntries.length;

    return average;
  };

  const averageEntry = averageEntries();

  const averageExits = () => {
    const yearExits = exits.filter(
      (item) => new Date(item.date + "T12:00:00").getFullYear() === currentYear
    );

    if (yearExits.length === 0) return { value: 0 };

    const total = yearExits.reduce((acc, item) => {
      const amount = Number(item.amount);
      return (acc = acc + amount);
    }, 0);

    const average = total / yearExits.length;

    return average;
  };

  const averageExit = averageExits();

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const response = await fetch(logoName);
    const blob = await response.blob();

    const base64data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    doc.addImage(base64data, "PNG", 14, 5, 40, 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Summary Report", pageWidth / 2, 14, { align: "center" });

    const tableColumn = ["Month", "Year", "Entry", "Exit", "Total"];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearEntries = entries.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === currentYear
    );
    const yearExits = exits.filter(
      (e) => new Date(e.date + "T12:00:00").getFullYear() === currentYear
    );
    const dateByMonth = months.map((month) => {
      const entriesSum = yearEntries
        .filter((e) => new Date(e.date + "T12:00:00").getMonth() + 1 === month)
        .reduce((acc, e) => acc + e.amount, 0);

      const exitsSum = yearExits
        .filter((e) => new Date(e.date + "T12:00:00").getMonth() + 1 === month)
        .reduce((acc, e) => acc + e.amount, 0);

      return {
        month,
        year: currentYear,
        entries: entriesSum,
        exits: exitsSum,
        total: entriesSum - exitsSum,
      };
    });

    const tableRows = dateByMonth.map((item) => {
      const monthName = new Date(0, item.month - 1).toLocaleDateString(
        "en-US",
        { month: "long" }
      );

      return [
        monthName,
        item.year,
        `R$ ${Number(item.entries).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
        `R$ ${Number(item.exits).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
        `R$ ${Number(item.total).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`,
      ];
    });

    const totalAmount = dateByMonth.reduce(
      (acc, item) => acc + (item.entries - item.exits),
      0
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 22,
    });

    const yPosition = (doc.lastAutoTable.finalY || 22) + 10;
    const text = `Total: R$  ${totalAmount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    })}`;
    doc.text(text, pageWidth / 2, yPosition, { align: "center" });

    const canvas = await html2canvas(highlighRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pageHeight = doc.internal.pageSize.getHeight();
    let y = doc.lastAutoTable.finalY + 20;

    const fixedWidth = 80;
    const fixedHeight = 130;

    if (y + fixedHeight > pageHeight) {
      doc.addPage();
      y = 20;
    }

    const x = (pageWidth - fixedWidth) / 2;

    doc.addImage(imgData, "PNG", x, y, fixedWidth, fixedHeight);

    doc.save(`report-summary-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="flex flex-col items-center w-full min-w-[340px] text-xs sm:text-base h-auto">
      <div className="flex flex-col items-center justify-center h-auto w-full sm:w-[95%] min-w-[340px] p-0.5 sm:p-2 sm:my-1 md:my-2 sm:pb-6 border-2 sm:border-4 border-primary shadow-xl shadow-primary">
        <h1 className="text-center font-bold text-4xl my-4">Summary</h1>

        <div className="flex flex-col sm:flex-row justify-center items-center w-auto gap-2 p-2 flex-wrap border-2 sm:border-4 border-primary shadow-primary">
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
                    {selectedQuarter ||
                    selectedLastSixMonths ||
                    showYearSelect ? (
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
                              R${" "}
                              {item.entries.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                              R$ -
                              {item.exits.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                              <strong>
                                R${" "}
                                {item.total.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}
                              </strong>
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
                          R${" "}
                          {totalEntries.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                          R$ -
                          {totalExits.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="bg-blue-200 text-black border border-black sm:px-2 px-0 sm:py-1 py-0">
                          <strong>
                            R${" "}
                            {total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </strong>
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
                  onClick={() => {
                    handleQuarterChange();
                    setShowYearSelect(false);
                  }}
                  className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
                >
                  Quarter
                </button>
              </Tooltip>
              <Tooltip text="Filter last 6 months" position="bottom">
                <button
                  onClick={() => {
                    handleLastSixMonthsChange();
                    setShowYearSelect(false);
                  }}
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

          {/* Destaques do periodo */}
          <div
            ref={highlighRef}
            className="bg-primary text-black flex flex-col justify-between items-center sm:p-4 p-1 mb-4 border-box w-auto min-w-[290px] h-auto min-h-[380px] shadow-2xl shadow-tertiary text-xs sm:text-base"
          >
            <h2 className="font-bold text-2xl box-info sm:mb-4 mb-2">
              Highlights of the year
            </h2>

            <div className="box-info mb-4 border-2 border-tertiary p-2 bg-slate-300">
              <p className="font-bold text-xl">Biggest entry</p>
              <p className="font-bold text-2xl text-green-600">
                R${" "}
                {biggestEntryValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="font-bold text-[12px]">in:{biggestEntryMonth}</p>
            </div>

            <div className="box-info mb-4 border-2 border-tertiary p-3 bg-slate-300">
              <p className="font-bold text-xl">Biggest exit</p>
              <p className="font-bold text-2xl text-red-600">
                R$ -
                {biggestExitValue.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="font-bold text-[12px]">in: {biggestExitMonth}</p>
            </div>

            <div className="box-info mb-4 border-2 border-tertiary p-3 bg-slate-300">
              <p className="font-bold text-xl">Monthly average</p>
              <div className="flex sm:flex-row flex-col justify-between items-center">
                <p className="font-bold text-base">Entry: </p>
                <p className="text-green-600 font-bold text-xl">
                  R${" "}
                  {averageEntry.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-between items-center">
                <p className="font-bold text-base">Exit: </p>
                <p className="text-red-600 font-bold text-xl">
                  R$ -
                  {averageExit.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full p-2 gap-2 justify-center items-end py-12">
          <button
            onClick={() => {
              exportToPDF();
            }}
            className="bg-blue-500 p-0.5 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1 text-2xl"
          >
            <FaFilePdf /> Export PDF Current Year
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
