import { FaEdit, FaFilePdf, FaPlusSquare, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Exit() {
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
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    1
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ -3.000,00
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Salary
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Monthly salary for September
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    2023-09-30
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="bg-red-800 text-white">
                    Total month: R$ -3.000,00
                  </td>
                </tr>
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    2
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ -2.000,00
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Investment
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Return on investment in stocks
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    2023-10-01
                  </td>
                </tr>
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    3
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ -1.500,00
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Freelance
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    Payment for freelance work
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    2023-10-05
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="bg-red-800 text-white">
                    Total month: R$ -3.500,00
                  </td>
                </tr>
                {/*Toda vez q fechar o mes mostrar o total do mes */}
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
