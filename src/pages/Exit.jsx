import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaFilePdf, FaPlusSquare, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Loading from "../components/Loading";

function Exit() {
  const [exits, setExits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExits = async () => {
    try {
      const res = await axios.get("http://localhost:5000/exits");

      setExits(res.data);
      setLoading(false);
    }catch (err) {
      console.error("Error fetching exits: ", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const [year, month] = item.date.split("/").reverse();
      const key = `${month}/${year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  const groupedExits = groupByMonth(exits);

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
                {Object.entries(groupedExits).map(([month, items]) => {
                  const total = items.reduce(
                    (sum, item) => sum + item.amount,
                    0
                  );

                  return (
                    <React.Fragment key={month}>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                            {item.id}
                          </td>
                          <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                            R$ -
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
                            {item.date}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td
                          colSpan="5"
                          className="font-bold bg-red-600 border border-black sm:px-2 px-0 sm:py-1 py-0"
                        >
                          Total {month}: R$ -
                          {total.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
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
        {/* tooltip nos botoes de data */}
      </div>

      {/* Buttons */}
      <div className="flex flex-row w-full p-2 gap-2 justify-center items-end py-12">
        <button className="bg-green-600 p-2 rounded w-auto flex items-center active:bg-green-800 border-collapse border-2 border-tertiary gap-1">
          <FaPlusSquare />
          New exit
        </button>
        <button className="bg-yellow-600 p-2 rounded w-auto flex items-center active:bg-yellow-800 border-collapse border-2 border-tertiary gap-1">
          <FaEdit />
          Edit
        </button>
        <button className="bg-red-600 p-2 rounded w-auto flex items-center active:bg-red-800 border-collapse border-2 border-tertiary gap-1">
          <FaTrash />
          Delete
        </button>
        <button className="bg-blue-500 p-2 rounded w-auto flex items-center active:bg-blue-800 border-collapse border-2 border-tertiary gap-1">
          <FaFilePdf />
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default Exit;
