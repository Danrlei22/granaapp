import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaFilePdf, FaPlusSquare, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import React from "react";

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

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/summary");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const dateObj = new Date(item.date);

      if (isNaN(dateObj)) return acc;

      const monthName = dateObj.toLocaleDateString("pt-BR", { month: "long" });
      const year = dateObj.getFullYear();

      const key = `${monthName.charAt(0).toUpperCase()}${monthName.slice(
        1
      )}/${year}`;

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
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry = {
      type: "entry",
      amount: parseFloat(amount.replace(",", ".")),
      category,
      description,
      date,
    };

    try {
      const res = await axios.post("http://localhost:5000/summary", newEntry);
      const createdEntry = res.data;
      alert("Entry added successfully!");

      await fetchEntries();

      setHighlightedId(createdEntry.id);

      setTimeout(() => {
        setHighlightedId(null);
      }, 3000);

      setAmount("0,00");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Failed to add entry. Please try again.");
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
    const confirmCancel = window.confirm("Are you sure you want to cancel?");

    if (confirmCancel) {
      setShowForm(false);
    }
  };

  const monthMap = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthEntries = Object.entries(groupedEntries).filter(
    ([month]) => {
      const [monthName, year] = month.toLowerCase().split("/");
      return (
        monthMap[monthName.toLowerCase()] === currentMonth &&
        Number(year) === currentYear
      );
    }
  );

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

      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:5000/summary/${id}`)
        )
      );

      setSelectedIds([]);
      setIsDeleteMode(false);
      await fetchEntries();
    } catch (error) {
      console.error("Error deleting multiple items: ", error);
      alert("Error deleting entries. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full w-min-[340px] text-xs sm:text-base h-full">
      {/* Search Bar */}
      <div className="flex flex-row p-4 bg-green-600 gap-2 w-auto m-4 rounded-lg shadow-lg max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-blue-800 ">
          <FaMagnifyingGlass /> Search
        </button>
      </div>

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
                {currentMonthEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-2 text-black italic"
                    >
                      No entries found for this month.
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
                            Total {month}: R${" "}
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
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
              Day
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
              Month
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
              Quarter
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
              Semester
            </button>
            <button className="bg-green-600 text-white p-2 rounded w-auto flex items-center active:bg-green-800">
              Year
            </button>
          </div>
        </div>
        {/* tooltip nos botoes de data */}
      </div>

      {/* Form */}
      {showForm && (
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
            <h1 className="font-bold text-2xl box-info mb-4">New Entry</h1>
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
      <div className="flex flex-row w-full p-2 gap-2 justify-center items-end py-12">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 p-2 rounded w-auto flex items-center active:bg-green-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaPlusSquare /> New entry
        </button>
        <button className="bg-yellow-600 p-2 rounded w-auto flex items-center active:bg-yellow-800 border-collapse border-2 border-tertiary gap-1">
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => {
            if (!isDeleteMode) {
              setIsDeleteMode(true);
            } else if (selectedIds.length > 0) {
              handleDeleteSelected();
            } else {
              alert("Select at least one item to delete.");
            }
          }}
          className="bg-red-600 p-2 rounded w-auto flex items-center active:bg-red-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaTrash /> {isDeleteMode ? "Confirm Deletion" : "Delete"}
        </button>
        <button className="bg-blue-500 p-2 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
          <FaFilePdf /> Export PDF
        </button>
      </div>
    </div>
  );
}

export default Entry;
