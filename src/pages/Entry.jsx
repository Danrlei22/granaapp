import { FaMagnifyingGlass } from "react-icons/fa6";

function Entry() {
  return (
    <div className="flex flex-col items-center w-full w-min-[350px]">
      <div className="flex flex-row p-4 bg-secondary gap-2 w-auto m-4 rounded-lg shadow-lg max-w-2xl">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-auto flex items-center gap-2 active:bg-blue-800 ">
          <FaMagnifyingGlass /> Search
        </button>
      </div>

      <div className="flex flex-row flex-wrap justify-center items-start h-auto sm:p-2 p-0 text-xs sm:text-base">
        <div className="flex flex-col items-center justify-center w-auto sm:m-2 m-0 sm:p-4 p-1 rounded shadow-2xl shadow-tertiary border-4 border-tertiary">
          <h1 className="font-bold text-2xl box-info sm:mb-4 mb-2">Entry</h1>
          <div>
            <table className="border border-tertiary w-full text-center">
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
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    1
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ 3.000,00
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
                  <td colSpan={5} className="bg-green-800 text-white">
                    Total month: R$ 3.000,00
                  </td>
                </tr>
                <tr>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    2
                  </td>
                  <td className="border border-black sm:px-2 px-0 sm:py-1 py-0">
                    R$ 2.000,00
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
                    R$ 1.500,00
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
                  <td colSpan={5} className="bg-green-800 text-white">
                    Total month: R$ 3.500,00
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
      </div>

      <div className="flex flex-row w-full h-auto p-2">
        <button></button>
      </div>
    </div>
  );
}

export default Entry;
