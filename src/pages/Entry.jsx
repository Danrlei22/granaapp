import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaFilePdf, FaPlusSquare, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoName from "../assets/logoName.PNG";
import DataFilter from "../components/filters/DateFilter";
import MonthFilter from "../components/filters/MonthFilter";
import Loading from "../components/Loading";
import YearFilter from "../components/filters/YearFilter";
import SearchBar from "../components/SearchBar";
import Tooltip from "../components/ui/Tooltip";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Entry() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("0,00");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const categories = ["Salary", "Freelance", "Investment", "Present", "Other"];
  const [showForm, setShowForm] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [activeFilterType, setActiveFilterType] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [selectedLastSixMonths, setSelectedLastSixMonths] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("https://granaapp.onrender.com/summary");
      const entriesData = res.data.filter((item) => item.type === "entry");
      setEntries(entriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (editingData) {
      setAmount(editingData.amount.toString().replace(".", ","));
      setCategory(editingData.category);
      setDescription(editingData.description);
      setDate(editingData.date);
    }
  }, [editingData]);

  if (loading) {
    return <Loading />;
  }

  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const dateObj = new Date(item.date + "T12:00:00");

      if (isNaN(dateObj)) return acc;

      const month = dateObj.getMonth();
      const year = dateObj.getFullYear();

      const key = `${month}/${year}`;

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  const groupedEntries = groupByMonth(entries);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !amount ||
      parseFloat(amount.replace(",", ".")) <= 0 ||
      !category ||
      !date
    ) {
      toast.info("Please fill in all required fields.");
      return;
    }
    try {
      if (editingData) {
        confirmAlert({
          title: "Confirm Update",
          message: "Are you sure you want to update this entry?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                try {
                  await axios.put(
                    `https://granaapp.onrender.com/summary/${editingData.id}`,
                    {
                      ...editingData,
                      amount: parseFloat(amount.replace(",", ".")),
                      category,
                      description,
                      date,
                    }
                  );

                  toast.info("Entry updated successfully!");
                  fetchEntries();
                } catch (error) {
                  toast.error("Failed to update entry. Please try again.");
                  console.error("Error updating entry:", error);
                  return;
                }
              },
            },
            {
              label: "No",
              onClick: () => {
                setEditingData(null);
                setIsEditModalOpen(false);
                setShowForm(false);
                setIsEditMode(false);
                setSelectedEditId(null);
                setAmount("0,00");
                setCategory("");
                setDescription("");
                setDate("");
              },
            },
          ],
          className:
            "rounded-xl p-6 bg-white text-black shadow-xl max-w-md w-full text-center",
          overlayClassName:
            "bg-black bg-opacity-60 fixed inset-0 flex items-center justify-center",
        });

        /*const confirmed = confirm(
          "Are you sure you want to update this entry?"
        );
        if (!confirmed) return;

        await axios.put(
          `https://granaapp.onrender.com/summary/${editingData.id}`,
          {
            ...editingData,
            amount: parseFloat(amount.replace(",", ".")),
            category,
            description,
            date,
          }
        );

        toast.info("Entry updated successfully!");*/
      } else {
        await axios.post("https://granaapp.onrender.com/summary", {
          type: "entry",
          amount: parseFloat(amount.replace(",", ".")),
          category,
          description,
          date,
        });

        toast.success("Entry added successfully!");
      }

      await fetchEntries();

      setHighlightedId(editingData ? editingData.id : null);

      setTimeout(() => {
        setHighlightedId(null);
      }, 3000);

      setEditingData(null);
      setIsEditModalOpen(false);
      setShowForm(false);
      setIsEditMode(false);
      setSelectedEditId(null);
      setAmount("0,00");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding entry:", error);
      toast.error("Failed to process entry. Please try again.");
    }
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.padStart(3, "0");

    const reais = value.slice(0, -2);
    const centavos = value.slice(-2);

    setAmount(`${parseInt(reais)}${","}${centavos}`);
  };

  const handleCancel = () => {
    setEditingData(null);
    setIsEditModalOpen(false);
    setShowForm(false);
    setIsEditMode(false);
    setSelectedEditId(null);
    setAmount("0,00");
    setCategory("");
    setDescription("");
    setDate("");
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthEntries = Object.entries(groupedEntries).filter(([key]) => {
    const [month, year] = key.split("/").map(Number);
    return month === currentMonth && year === currentYear;
  });

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete the selected items?"
      );
      if (!confirmed) return;

      toast.warning("Entry deleted!");

      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`https://granaapp.onrender.com/summary/${id}`)
        )
      );

      setSelectedIds([]);
      setIsDeleteMode(false);
      await fetchEntries();
    } catch (error) {
      console.error("Error deleting multiple items: ", error);
      toast.error("Error deleting entries. Please try again.");
    }
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    const response = await fetch(logoName);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64data = reader.result;

      doc.addImage(base64data, "PNG", 14, 5, 40, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Input Report", pageWidth / 2, 14, { align: "center" });

      const tableColumn = ["ID", "Amount", "Category", "Description", "Date"];

      const tableRows = entries.map((entry) => [
        entry.id,
        `R$ ${entry.amount.toFixed(2).replace(".", ",")}`,
        entry.category,
        entry.description,
        new Date(entry.date).toLocaleDateString("pt-BR"),
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 22,
      });

      doc.save(`report-input-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    reader.readAsDataURL(blob);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const filtered = entries.filter((item) => {
      const itemDate = new Date(item.date).toISOString().split("T")[0];
      return itemDate === date;
    });

    setFilteredEntries(filtered);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);

    const filtered = entries.filter((item) => {
      const date = new Date(item.date + "T12:00:00");
      return (
        date.getMonth() === parseInt(month) &&
        date.getFullYear() === currentYear
      );
    });

    setFilteredEntries(filtered);
  };

  const handleQuarterChange = () => {
    setSelectedQuarter(true);

    const lastThreeMonths = [
      currentMonth,
      (currentMonth - 1 + 12) % 12,
      (currentMonth - 2 + 12) % 12,
    ];

    const filtered = entries.filter((item) => {
      const date = new Date(item.date + "T12:00:00");
      return (
        lastThreeMonths.includes(date.getMonth()) &&
        date.getFullYear() === currentYear
      );
    });

    setFilteredEntries(filtered);
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

    const filtered = entries.filter((entry) => {
      if (!entry?.date) return false;

      const entryDate = new Date(entry.date);
      const entryMonth = entryDate.getMonth() + 1;
      const entryYear = entryDate.getFullYear();

      return lastSixMonths.some(
        (m) => m.month === entryMonth && m.year === entryYear
      );
    });

    setFilteredEntries(filtered);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);

    const filtered = entries.filter((item) => {
      const date = new Date(item.date + "T12:00:00");

      return date.getFullYear().toString() === year;
    });

    setFilteredEntries(filtered);
  };

  const handleSearch = (term) => {
    if (term.trim() === "") {
      setFilteredEntries([]);
      setIsSearchActive(false);
      return;
    }

    const lowerTerm = term.toLowerCase();

    const filtered = entries.filter((entry) => {
      return (
        entry.description.toLowerCase().includes(lowerTerm) ||
        entry.category.toLowerCase().includes(lowerTerm)
      );
    });

    setFilteredEntries(filtered);
    setIsSearchActive(true);

    setSelectedDate(null);
    setSelectedMonth(null);
    setSelectedQuarter(null);
    setSelectedLastSixMonths(null);
    setSelectedYear(null);
  };

  return (
    <div className="flex flex-col items-center w-full w-min-[340px] text-xs sm:text-base h-full">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Entry tables */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:p-2 p-1">
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <h1 className="font-bold text-2xl box-info sm:mb-4 mb-2">Entry</h1>
          <div className="overflow-x-auto w-auto max-w-[320px] sm:max-w-[640px]">
            <table className="border border-tertiary text-center min-w-[400px]">
              <thead className="bg-tertiary text-white">
                <tr>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    ID
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Amount
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Category
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Description
                  </th>
                  <th className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-green-300 text-black">
                {isSearchActive ||
                selectedDate ||
                selectedMonth ||
                selectedQuarter ||
                selectedLastSixMonths ||
                selectedYear ? (
                  filteredEntries.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-2 text-black italic"
                      >
                        No entries found for selected date.
                      </td>
                    </tr>
                  ) : (
                    filteredEntries.map((item) => (
                      <tr
                        key={item.id}
                        className={`transition duration-300 ${
                          highlightedId === item.id ? "animate-bg-blink" : ""
                        } ${selectedIds.includes(item.id) ? "bg-red-200" : ""}`}
                      >
                        <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                          {isDeleteMode && (
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item.id)}
                              onChange={() => toggleSelection(item.id)}
                            />
                          )}
                          {isEditMode && (
                            <input
                              type="radio"
                              name="edit-select"
                              checked={selectedEditId === item.id}
                              value={item.id}
                              onChange={() => {
                                setSelectedEditId(item.id);
                                setEditingData(item);
                                setIsEditModalOpen(true);
                              }}
                            />
                          )}
                          {item.id}
                        </td>
                        <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                          R${" "}
                          {item.amount.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                          {item.category}
                        </td>
                        <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                          {item.description}
                        </td>
                        <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                          {(() => {
                            const [year, month, day] = item.date.split("-");
                            return `${day}/${month}/${year}`;
                          })()}
                        </td>
                      </tr>
                    ))
                  )
                ) : currentMonthEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-2 text-black italic"
                    >
                      No entries found for selected date.
                    </td>
                  </tr>
                ) : (
                  currentMonthEntries.map(([month, items]) => {
                    const total = items.reduce(
                      (sum, item) => sum + item.amount,
                      0
                    );
                    return (
                      <React.Fragment key={month}>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className={`transition duration-300 ${
                              highlightedId === item.id
                                ? "animate-bg-blink"
                                : ""
                            } ${
                              selectedIds.includes(item.id) ? "bg-red-200" : ""
                            }`}
                          >
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                              {isDeleteMode && (
                                <input
                                  type="checkbox"
                                  checked={selectedIds.includes(item.id)}
                                  onChange={() => toggleSelection(item.id)}
                                />
                              )}
                              {isEditMode && (
                                <input
                                  type="radio"
                                  name="edit-select"
                                  checked={selectedEditId === item.id}
                                  value={item.id}
                                  onChange={() => {
                                    setSelectedEditId(item.id);
                                    setEditingData(item);
                                    setIsEditModalOpen(true);
                                  }}
                                />
                              )}
                              {item.id}
                            </td>
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                              R${" "}
                              {item.amount.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                              {item.category}
                            </td>
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                              {item.description}
                            </td>
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                              {(() => {
                                const [year, month, day] = item.date.split("-");
                                return `${day}/${month}/${year}`;
                              })()}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td
                            colSpan="5"
                            className="font-bold bg-green-600 border border-black sm:px-2 px-0 sm:py-1 py-0"
                          >
                            Total month {month}: R${" "}
                            {total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center w-auto border-box shadow-2xl shadow-tertiary">
          <h2 className="font-bold pl-2">Period filter:</h2>
          <div className="flex flex-row w-auto h-[60px] border-2 border-tertiary gap-2 p-2 m-1">
            <Tooltip text="Filter entries by day" position="bottom">
              <button
                onClick={() =>
                  setActiveFilterType((prev) => (prev === "day" ? null : "day"))
                }
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Day
              </button>
            </Tooltip>

            <Tooltip text="Filter entries by month" position="bottom">
              <button
                onClick={() =>
                  setActiveFilterType((prev) =>
                    prev === "month" ? null : "month"
                  )
                }
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Month
              </button>
            </Tooltip>

            <Tooltip text="Filter entries last 3 months" position="bottom">
              <button
                onClick={handleQuarterChange}
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Quarter
              </button>
            </Tooltip>

            <Tooltip text="Filter entries las 6 months" position="bottom">
              <button
                onClick={handleLastSixMonthsChange}
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Last 6 months
              </button>
            </Tooltip>

            <Tooltip text="Filter entries by year" position="bottom">
              <button
                onClick={() =>
                  setActiveFilterType((prev) =>
                    prev === "year" ? null : "year"
                  )
                }
                className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800"
              >
                Year
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-start justify-center w-full">
            {activeFilterType === "day" && (
              <DataFilter onDateChange={handleDateChange} />
            )}

            {activeFilterType === "month" && (
              <MonthFilter onMonthChange={handleMonthChange} />
            )}

            {activeFilterType === "year" && (
              <YearFilter onYearChange={handleYearChange} entries={entries} />
            )}

            {(selectedDate ||
              selectedMonth ||
              selectedQuarter ||
              selectedLastSixMonths ||
              selectedYear) && (
              <div className="w-full text-center mt-4">
                <span
                  onClick={() => {
                    setSelectedDate("");
                    setFilteredEntries([]);
                    setSelectedMonth("");
                    setActiveFilterType(null);
                    setSelectedQuarter("");
                    setSelectedLastSixMonths("");
                    setSelectedYear("");
                  }}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Clean filter
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      {(showForm || isEditModalOpen) && (
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md p-4 gap-2"
          >
            <button
              type="button"
              className="text-red-600 hover:text-red-800 flex justify-end text-xl"
              onClick={handleCancel}
            >
              <FaXmark />
            </button>
            <h1 className="font-bold text-2xl box-info mb-4">
              {editingData ? "Edit Entry" : "New Entry"}
            </h1>
            <label className="font-bold">Amount:</label>
            <input
              type="text"
              name="amount"
              placeholder="0,00"
              min={0}
              value={amount}
              onChange={handleAmountChange}
              className="border border-tertiary p-2 rounded w-full text-black"
              required
            />
            <label className="font-bold">Category:</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-tertiary p-2 rounded w-full text-black"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className="font-bold">Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              max={50}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-tertiary p-2 rounded w-full text-black"
            />

            <label className="font-bold">Date:</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-tertiary p-2 rounded w-full text-black"
              required
            />

            <button
              type="submit"
              className="font-bold bg-blue-600 text-white p-2 rounded w-full flex items-center justify-center active:bg-blue-800 mt-4"
            >
              Submit
            </button>

            <button
              type="button"
              className="font-bold bg-yellow-600 text-white p-2 rounded w-full flex items-center justify-center active:bg-yellow-800 mt-2"
              onClick={() => {
                setAmount("0,00");
                setCategory("");
                setDescription("");
                setDate("");
              }}
            >
              Reset
            </button>

            <button
              type="button"
              className="font-bold bg-red-600 text-white p-2 rounded w-full flex items-center justify-center active:bg-red-800 mt-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-row flex-wrap w-full p-2 gap-2 justify-center items-end py-12">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 p-2 rounded w-auto flex items-center active:bg-green-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaPlusSquare /> New entry
        </button>
        <button
          onClick={() => {
            if (!isEditMode) {
              setIsEditMode(true);
              setIsDeleteMode(false);
            }
          }}
          className="bg-yellow-600 p-2 rounded w-auto flex items-center active:bg-yellow-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaEdit /> Edit
        </button>
        {isEditMode && (
          <button
            onClick={() => {
              setIsEditMode(false);
              setSelectedEditId(null);
              setEditingData(null);
              setIsEditModalOpen(false);
            }}
            className="bg-yellow-400 p-2 rounded w-auto flex items-center active:bg-yellow-800 border-collapse border-2 border-tertiary gap-1"
          >
            <FaXmark /> Cancel edit
          </button>
        )}
        <button
          onClick={() => {
            if (!isDeleteMode) {
              setIsDeleteMode(true);
              setIsEditMode(false);
            } else if (selectedIds.length > 0) {
              handleDeleteSelected();
            } else {
              alert("Select at least one item to delete.");
            }
          }}
          className="bg-red-600 p-2 rounded w-auto flex items-center active:bg-red-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaTrash />{" "}
          {isDeleteMode
            ? selectedIds.length > 0
              ? "Confirm Deletion"
              : "Selecionar itens"
            : "Delete"}
        </button>
        {isDeleteMode && (
          <button
            onClick={() => {
              setIsDeleteMode(false);
              setSelectedIds([]);
            }}
            className="bg-red-400 p-2 rounded w-auto flex items-center active:bg-red-800 border-collapse border-2 border-tertiary gap-1"
          >
            <FaXmark /> Cancel delete
          </button>
        )}
        <button
          onClick={exportToPDF}
          className="bg-blue-500 p-2 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaFilePdf /> Export PDF
        </button>
      </div>
    </div>
  );
}

export default Entry;
