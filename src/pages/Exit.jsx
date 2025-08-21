import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaFilePdf, FaPlusSquare, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import calculateTotal from "../utils/calculateTotal";
import { confirmAlert } from "react-confirm-alert";

function Exit() {
  const [exits, setExits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("0,00");
  const categories = [
    "Food",
    "Entretainment",
    "Home",
    "Health",
    "Light",
    "Water",
    "Car",
    "Other",
  ];
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedEditId, setSelectedEditId] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchExits = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exits");

      setExits(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching exits: ", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExits();
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

      const key = `${month + 1}/${year}`;

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  const groupedExits = groupByMonth(exits);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentMonthExits = Object.entries(groupedExits).filter(([key]) => {
    const [month, year] = key.split("/").map(Number);
    return month === currentMonth && year === currentYear;
  });

  const resetForm = () => {
    setShowForm(false);
    setAmount("0,00");
    setCategory("");
    setDescription("");
    setDate("");
    setEditingData(null);
    setIsEditModalOpen(false);
    setIsEditMode(false);
    setSelectedEditId(null);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    value = value.padStart(3, "0");

    const reais = value.slice(0, -2);
    const centavos = value.slice(-2);

    setAmount(`${parseInt(reais)}${","}${centavos}`);
  };

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
          message: "Are you sure you want to update?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                try {
                  await axios.put(
                    `http://localhost:5000/exits/${editingData.id}`,
                    {
                      ...editingData,
                      amount: parseFloat(amount.replace(",", ".")),
                      category,
                      description,
                      date,
                    }
                  ),
                    toast.info("Update successfully!");
                  fetchExits();
                } catch (err) {
                  toast.error("Failed to update. Please try again.");
                  console.error("Error updating", err);
                  return;
                }
              },
            },
            {
              label: "No",
              onClick: () => {
                resetForm();
                toast.info("Update cancelled.");
              },
            },
          ],
        });
      } else {
        await axios.post("http://localhost:5000/exits", {
          amount: parseFloat(amount.replace(",", ".")),
          category,
          description,
          date,
        });

        toast.success("Exit added successfully!");
      }

      await fetchExits();
      resetForm();
    } catch (err) {
      console.error("Error adding exit: ", err);
      toast.error("Error adding exit. Please try again.");
    }
  };

  const handleDeleteSelected = async () => {};

  return (
    <div className="flex flex-col items-center w-full w-min-[340px] text-xs sm:text-base h-full">
      {/* Search Bar */}
      <div className="flex flex-row p-4 bg-red-600 gap-2 w-auto m-4 rounded-lg shadow-lg max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-blue-800 ">
          <FaMagnifyingGlass /> Search
        </button>
      </div>

      {/* Exit tables */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:p-2 p-1">
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <h1 className="font-bold text-2xl box-info sm:mb-4 mb-2">Exit</h1>
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
              <tbody className="bg-red-300 text-black">
                {currentMonthExits.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-2 text-black italic"
                    >
                      No exits found for selected date.
                    </td>
                  </tr>
                ) : (
                  currentMonthExits.map(([month, items]) => {
                    return (
                      <React.Fragment key={month}>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
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
                              R$ - {""}
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
                            className="font-bold bg-red-600 border border-black sm:px-2 px-0 sm:py-1 py-0"
                          >
                            <span>Month: {month}</span>
                            <br />
                            <span>
                              Total: R$ -{" "}
                              {calculateTotal(
                                groupedExits[month]
                              ).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
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
            <button className="bg-red-600 text-white p-2 rounded w-auto flex items-center active:bg-red-800">
              Day
            </button>
            <button className="bg-red-600 text-white p-2 rounded w-auto flex items-center active:bg-red-800">
              Month
            </button>
            <button className="bg-red-600 text-white p-2 rounded w-auto flex items-center active:bg-red-800">
              Quarter
            </button>
            <button className="bg-red-600 text-white p-2 rounded w-auto flex items-center active:bg-red-800">
              Semester
            </button>
            <button className="bg-red-600 text-white p-2 rounded w-auto flex items-center active:bg-red-800">
              Year
            </button>
          </div>
        </div>
      </div>

      {/* Form add/edit */}
      {(showForm || isEditModalOpen) && (
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-1 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md p-4 gap-2"
          >
            <button
              type="button"
              className="text-red-600 hover:text-red-800 flex justify-end text-xl"
              onClick={resetForm}
            >
              <FaXmark />
            </button>
            <h2 className="font-bold text-2xl box-info mb-4">
              {editingData ? "Edit Exit" : "New Exit"}
            </h2>
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
              onClick={resetForm}
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
          <FaPlusSquare />
          New exit
        </button>
        <button
          onClick={() => {
            if (!isEditMode) {
              setIsEditMode(true);
            }
          }}
          className="bg-yellow-600 p-2 rounded w-auto flex items-center active:bg-yellow-800 border-collapse border-2 border-tertiary gap-1"
        >
          <FaEdit />
          Edit
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
            <FaXmark />
            Cancel edit
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
            <FaXmark />
            Cancel delete
          </button>
        )}
        <button className="bg-blue-500 p-2 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
          <FaFilePdf />
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default Exit;
